import { CoaError } from 'coa-error'
import { _, axios } from 'coa-helper'
import { createSign, createVerify } from 'crypto'
import * as FormData from 'form-data'
import { createReadStream } from 'fs'

export interface DgPayConfig {
    endpoint: string
    publicKey: string
    privateKey: string
    sys_id: string // 系统号
    product_id: string // 产品号
    dgpublicKey: string
    notifyUrlMap: Record<string, string>
    settle_config: Record<string, string>
    wx_conf_list: Array<Record<string, any>>
    cash_config: Record<string, any>
    wx_conf_list_unincorporate: Array<Record<string, any>>
}

export class DgPayBin {
    // 基本配置
    readonly config: DgPayConfig
    protected readonly thresholdTooLong = 2 * 1000

    constructor(config: DgPayConfig) {
        this.config = config
    }

    // 发送图片上传请求
    async uploadFile(url: string, data: Record<string, any>, imagePath: string) {
        const startAt = Date.now()
        const buffer = imagePath && createReadStream(imagePath)

        if (imagePath) {
            const form = new FormData()
            form.append('file', buffer)
            const param = {
                sys_id: this.config.sys_id, // 系统号
                product_id: this.config.product_id, // 产品号
                data: data,
            }
            // 请求并记录开始、结束时间
            const result = await axios({
                url: this.config.endpoint + url,
                method: 'POST',
                params: param,
                data: form,
                headers: {
                    ...form.getHeaders(),
                },
            })

            const endAt = Date.now()
            // 触发请求事件
            this.onRequest(param, data, result.data)

            // 触发请求时间过长事件
            if (endAt - startAt > this.thresholdTooLong) {
                this.onRequestTooLong(url, param, result.data, { startAt, endAt })
            }
            // 处理结果
            try {
                return this.handleResult(result)
            } catch (e) {
                // 触发请求错误事件
                this.onRequestError(url, param, result.data, e)
                throw e
            }
        }
    }

    // 发送请求
    async request(url: string, data: Record<string, any>, unErrorCode?: Record<string, boolean>) {
        // 组装参数并请求

        const params = this.buildParams(data)

        const startAt = Date.now()

        const result = await axios.post(this.config.endpoint + url, params, {
            headers: {
                'Content-type': 'application/json',
            },
        })

        const endAt = Date.now()
        // 触发请求事件
        this.onRequest(params, data, result.data)
        // 触发请求时间过长事件
        if (endAt - startAt > this.thresholdTooLong) {
            this.onRequestTooLong(url, params, result.data, { startAt, endAt })
        }

        // 处理结果
        try {
            return this.handleResult(result, unErrorCode)
        } catch (e) {
            // 触发请求错误事件
            this.onRequestError(url, params, result.data, e)
            throw e
        }
    }

    // 请求记录
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequest(params: any, content: any, response: any) { }

    // 请求失败
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequestError(url: any, params: any, response: any, error: any) { }

    // 请求时间过长
    onRequestTooLong(
        url: any,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        param: any,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response: any,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        time: { startAt: number; endAt: number }
    ) { }

    // 构造请求参数
    private buildParams(data: Record<string, any>) {
        // 构造
        const params = {
            sys_id: this.config.sys_id,
            product_id: this.config.product_id,
            data,
        } as Record<string, any>

        const sortData: Record<string, string> = {}

        _.forEach(Object.keys(data).sort(), (i) => (sortData[i] = data[i]))

        const privateKey = `-----BEGIN PRIVATE KEY-----\n${this.config.privateKey}\n-----END PRIVATE KEY-----`
        const sign = createSign('RSA-SHA256').update(JSON.stringify(sortData), 'utf-8').sign(privateKey, 'base64')

        params.sign = sign

        return params
    }

    private handleResult(res: any, unErrorCode?: Record<string, any>) {
        const data = res.data.data || {}
        // 判断结果是否正确
        const unErrorCodes: any = unErrorCode ? { '00000000': true, ...unErrorCode } : { '00000000': true }

        if (!unErrorCodes[data.resp_code]) {
            CoaError.message('DgError', `汇付系统提示:[${data.resp_code}]${data.resp_desc}`)
        }
        // 校验签名（有签名才校验）
        if (data.sign) {
            const dgpublicKey = `-----BEGIN PUBLIC KEY-----\n${this.config.dgpublicKey}\n-----END PUBLIC KEY-----`
            const verify = createVerify('RSA-SHA256').update(JSON.stringify(data), 'utf8').verify(dgpublicKey, data.sign, 'base64')
            verify || CoaError.message('DgError', '汇付系统: 返回结果校验失败')
        }
        return data
    }

    verifyAsyncSign(res: any, unErrorCode?: Record<string, any>) {
        const data = res.resp_data || {}

        if (res.resp_code !== '00000000') {
            CoaError.message('DgError', `汇付系统提示:[${data.resp_code}]${data.resp_desc}`)
        }
        // 校验签名（有签名才校验）
        if (res.sign) {
            const dgpublicKey = `-----BEGIN PUBLIC KEY-----\n${this.config.dgpublicKey}\n-----END PUBLIC KEY-----`
            const verify = createVerify('RSA-SHA256').update(res.resp_data, 'utf8').verify(dgpublicKey, res.sign, 'base64')
            verify || CoaError.message('DgError', '汇付系统: 返回结果校验失败')
        }

        return data
    }

    verifyAsyncBusiOpenSign(res: any) {
        const data = res || {}

        if (res.resp_code !== '10000') {
            CoaError.message('DgError', `汇付系统提示:[${data.resp_code}]${data.resp_desc}`)
        }
        // 校验签名（有签名才校验）
        if (res.sign) {
            const dgpublicKey = `-----BEGIN PUBLIC KEY-----\n${this.config.dgpublicKey}\n-----END PUBLIC KEY-----`
            const verify = createVerify('RSA-SHA256').update(res.data, 'utf8').verify(dgpublicKey, res.sign, 'base64')
            verify || CoaError.message('DgError', '汇付系统: 返回结果校验失败')
        }

        return data
    }
}
