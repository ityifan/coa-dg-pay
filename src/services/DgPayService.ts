import { CoaError } from 'coa-error'
import { _, dayjs } from 'coa-helper'
import { secure } from 'coa-secure'
import { DgPayBin, DgPayConfig } from '../libs/DgPayBIn'
import { DgPay } from '../typings'

export class DgPayService {
    protected bin: DgPayBin
    protected config: DgPayConfig

    constructor(bin: DgPayBin) {
        this.bin = bin
        this.config = this.bin.config
    }

    /**
     * 上传图片
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_shtpsc
     * @param params
     */

    async SupplementaryPicture(params: DgPay.SupplementaryPictureReq, file: any): Promise<DgPay.SupplementaryPictureRes> {
        return await this.bin.uploadFile('/supplementary/picture', params, file)
    }

    /**
     * 企业商户基本信息入驻
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_qyshjbxxrz
     * @param params
     */

    async MerchantBasicdataEnt(params: DgPay.MerchantBasicdataEntReq): Promise<DgPay.MerchantBasicdataEntRes> {
        return await this.bin.request('/merchant/basicdata/ent', params, { '90000000': true })
    }

    /**
     * 个人商户基本信息入驻
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_qyshjbxxrz
     * @param params
     */

    async MerchantBasicdataIndv(params: DgPay.MerchantBasicdataIndvReq): Promise<DgPay.MerchantBasicdataIndvRes> {
        return await this.bin.request('/merchant/basicdata/indv', params)
    }

    /**
     * 商户详情信息查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_shxxxxcx
     * @param params
     */
    async MerchantBasicdataQuery(params: DgPay.MerchantBasicdataQueryReq): Promise<DgPay.MerchantBasicdataQueryRes> {
        return await this.bin.request('/merchant/basicdata/query', params)
    }

    /**
     * 商户基本信息修改
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_shxxxxcx
     * @param params
     */

    async MerchantBasicdataModify(params: DgPay.MerchantBasicdataModifyReq): Promise<DgPay.MerchantBasicdataModifyRes> {
        return await this.bin.request('/merchant/basicdata/modify', params, { '90000000': true })
    }

    /**
     * 商户业务开通
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shywkt/api_shjj_shywkt
     * @param params
     */

    async MerchantBusiOpen(params: DgPay.MerchantBusiOpenReq): Promise<DgPay.MerchantBusiOpenRes> {
        return await this.bin.request('/merchant/busi/open', params, { '90000000': true, '99999999': true })
    }

    /**
     * 商户业务修改
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shywkt/api_shjj_shywktxg
     * @param params
     */

    async MerchantBusiModify(params: DgPay.MerchantBusiModifyReq): Promise<DgPay.MerchantBusiModifyRes> {
        return await this.bin.request('/merchant/busi/modify', params, { '90000000': true })
    }

    /**
     * 微信商户配置
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_wxshpz
     * @param params
     */

    async MerchantBusiConfig(params: DgPay.MerchantBusiConfigReq): Promise<DgPay.MerchantBusiConfigRes> {
        return await this.bin.request('/merchant/busi/config', params)
    }

    /**
     * 微信商户配置查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_wxshpzcx
     * @param params
     */

    async MerchantBusiConfigQuery(params: DgPay.MerchantBusiConfigQueryReq): Promise<DgPay.MerchantBusiConfigQueryRes> {
        return await this.bin.request('/merchant/busi/config/query', params)
    }

    /**
     * 微信实名认证
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_wxsmrz
     * @param params
     */

    async MerchantBusiRealname(params: DgPay.MerchantBusiRealnameReq): Promise<DgPay.MerchantBusiRealnameRes> {
        return await this.bin.request('/merchant/busi/realname', params)
    }

    /**
     * 微信实名认证状态查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_wxshpzcx
     * @param params
     */

    async MerchantBusiRealnameQuery(params: DgPay.MerchantBusiRealnameQueryReq): Promise<DgPay.MerchantBusiRealnameQueryRes> {
        return await this.bin.request('/merchant/busi/realname/query', params)
    }

    /**
     * 聚合正扫
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_wxshpzcx
     * @param params
     */

    async TradePaymentJspay(params: DgPay.TradePaymentJspay): Promise<DgPay.TradePaymentJspayRes> {
        const wx_data = {
            sub_appid: params.appWxaId || CoaError.message('CoaDgPay.MissingField', '缺少huifuId参数'),
            openid: params.openId || CoaError.message('CoaDgPay.MissingField', '缺少openId参数'),
            sub_openid: params.openId || CoaError.message('CoaDgPay.MissingField', '缺少openId参数'),
            body: params.goodsDesc || CoaError.message('CoaDgPay.MissingField', '缺少goodsDesc参数'),
            detail: {
                goods_detail: [
                    {
                        goods_name: params.goodsDesc,
                        price: (params.price / 100).toFixed(2) || CoaError.message('CoaDgPay.MissingField', '缺少price参数'),
                        goods_id: secure.id25(JSON.stringify(params) + _.random(0, 1000, false).toString()),
                        quantity: 1,
                    },
                ],
            },
        }
        const res: DgPay.TradePaymentJspayReq = {
            trade_type: params.tradeType || CoaError.message('CoaDgPay.MissingField', '缺少tradeType参数'),
            req_date: dayjs(_.now()).format('YYYYMMDD'),
            req_seq_id: params.orderId || CoaError.message('CoaDgPay.MissingField', '缺少orderId参数'),
            time_expire: dayjs(_.now() + 1000 * 15 * 60).format('YYYYMMDDHHmmss'),
            huifu_id: params.huifuId || CoaError.message('CoaDgPay.MissingField', '缺少huifuId参数'),
            trans_amt: (params.price / 100).toFixed(2) || CoaError.message('CoaDgPay.MissingField', '缺少price参数'),
            goods_desc: params.goodsDesc || CoaError.message('CoaDgPay.MissingField', '缺少goodsDesc参数'),
            wx_data: JSON.stringify(wx_data),
            notify_url: this.config.notifyUrlMap.jspayNotifyUrl || CoaError.message('CoaDgPay.MissingField', '缺少notifyUrl参数'),
        }
        return await this.bin.request('/trade/payment/jspay', res, { '00000100': true })
    }

    /**
     * 扫码交易查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/smzf/api_qrpay_cx
     * @param params
     */
    async TradePaymentScanpayQuery(params: DgPay.TradePaymentScanpayQuery): Promise<DgPay.TradePaymentScanpayQueryRes> {
        params.orgReqDate || CoaError.message('CoaDgPay.MissingField', '缺少orgReqDate参数')
        params.huifuId || CoaError.message('CoaDgPay.MissingField', '缺少huifuId参数')
        params.orderId || CoaError.message('CoaDgPay.MissingField', '缺少orderId参数')
        const result: DgPay.TradePaymentScanpayQueryReq = {
            org_req_date: dayjs(params.orgReqDate).format('YYYYMMDD'),
            org_req_seq_id: params.orderId,
            huifu_id: params.huifuId,
        }
        return await this.bin.request('/trade/payment/scanpay/query', result)
    }

    /**
     * 扫码交易退款
     * 接口文档地址https://paas.huifu.com/partners/api/#/smzf/api_qrpay_tk
     * @param params
     */

    async TradePaymentScanpayRefund(params: DgPay.TradePaymentScanpayRefund): Promise<DgPay.TradePaymentScanpayRefundRes> {
        params.huifuId || CoaError.message('CoaDgPay.MissingField', '缺少huifuId参数')
        params.orderId || CoaError.message('CoaDgPay.MissingField', '缺少orderId参数')
        params.orgReqDate || CoaError.message('CoaDgPay.MissingField', '缺少orgReqDate参数')
        params.refundId || CoaError.message('CoaDgPay.MissingField', '缺少refundId参数')
        params.refundPrice || CoaError.message('CoaDgPay.MissingField', '缺少refundPrice参数')
        const result: DgPay.TradePaymentScanpayRefundReq = {
            huifu_id: params.huifuId,
            req_seq_id: params.refundId,
            org_req_seq_id: params.orderId,
            ord_amt: (params.refundPrice / 100).toFixed(2),
            req_date: dayjs(_.now()).format('YYYYMMDD'),
            org_req_date: dayjs(params.orgReqDate).format('YYYYMMDD'),
            notify_url: this.bin.config.notifyUrlMap.refundNotifyUrl,
        }

        return await this.bin.request('/trade/payment/scanpay/refund', result, { '00000100': true })
    }

    /**
     * 扫码交易退款查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/smzf/api_qrpay_tkcx
     * @param params
     */

    async TradePaymentScanpayRefundquery(params: DgPay.TradePaymentScanpayRefundquery): Promise<DgPay.TradePaymentScanpayRefundqueryRes> {
        params.huifuId || CoaError.message('CoaDgPay.MissingField', '缺少huifuId参数')
        params.orderRefundId || CoaError.message('CoaDgPay.MissingField', '缺少orderRefundId参数')
        params.orgReqDate || CoaError.message('CoaDgPay.MissingField', '缺少orgReqDate参数')
        const result: DgPay.TradePaymentScanpayQueryReq = {
            huifu_id: params.huifuId,
            org_req_seq_id: params.orderRefundId,
            org_req_date: dayjs(params.orgReqDate).format('YYYYMMDD'),
        }
        return await this.bin.request('/trade/payment/scanpay/refundquery', result)
    }

    /**
     * 申请单状态查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shywkt/api_shjj_shywkt
     * @param params
     */

    async MerchantBasicdataStatusQuery(params: DgPay.MerchantBasicdataStatusQueryReq): Promise<DgPay.MerchantBasicdataStatusQueryRes> {
        return await this.bin.request('/merchant/basicdata/status/query', params)
    }

    /**
     * 账户余额查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/shjj/api_shjj_sqdztcx
     * @param params
     */

    async TradeAcctpaymentBalanceQuery(params: DgPay.TradeAcctpaymentBalanceQueryReq): Promise<DgPay.TradeAcctpaymentBalanceQueryRes> {
        return await this.bin.request('/trade/acctpayment/balance/query', params)
    }

    /**
     * 财务流水查询
     * 接口文档地址https://paas.huifu.com/partners/api/#/yuer/api_acctlscx
     * @param params
     */
    async TradeAcctpaymentAcctlogQuery(params: DgPay.tradeAcctpaymentAcctlogQueryReq): Promise<DgPay.TradeAcctpaymentBalanceQueryRes> {
        return await this.bin.request('/trade/acctpayment/acctlog/query', params)
    }

    /**
     * 交易投诉列表
     * 接口文档地址https://paas.huifu.com/partners/api/#/shgl/tousu/api_shgl_tousu_tscx
     * @param params
     */
    async GetComplaintList(params: DgPay.GetComplaintListReq): Promise<DgPay.GetComplaintListRes> {
        return await this.bin.request('/merchant/complaint/list/info/query', params)
    }
}
