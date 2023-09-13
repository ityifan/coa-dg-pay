export declare namespace DgPay {
    // 上传图片接口请求
    interface SupplementaryPictureReq {
        huifu_id: string
        req_seq_id: string
        req_date: string
        file_type: string
        picture: string
    }

    // 上传图片接口返回
    interface SupplementaryPictureRes {
        resp_desc: string
        file_id: string
        resp_code: string
    }

    // 企业商户基本信息入驻

    interface MerchantBasicdataEntReq {
        upper_huifu_id: string
        req_seq_id: string
        reg_name: string
        req_date: string
        short_name: string
        sms_send_flag: string
        ent_type: string
        license_code: string
        login_name: string
        license_validity_type: string
        license_begin_date: string
        reg_prov_id: string
        reg_area_id: string
        reg_district_id: string
        reg_detail: string
        legal_name: string
        legal_cert_type: string
        legal_cert_validity_type: string
        legal_cert_begin_date: string
        prov_id: string
        area_id: string
        district_id: string
        detail_addr: string
        contact_name: string
        contact_mobile_no: string
        contact_email: string
        service_phone: string
        busi_type: string
        receipt_name: string
        mcc: string
        card_info: string
        tax_reg_pic?: string
        legal_cert_back_pic?: string
        legal_cert_front_pic?: string
        license_pic?: string
        org_code_pic?: string
        license_end_date?: string
        legal_cert_end_date?: string
        settle_card_front_pic?: string
        settle_card_back_pic?: string
        settle_cert_back_pic?: string
        settle_cert_front_pic?: string
        auth_enturst_pic?: string
        reg_acct_pic?: string
        open_licence_no?: string
    }

    // 企业商户基本信息入驻
    interface MerchantBasicdataEntRes {
        resp_code: string
        resp_desc: string
        huifu_id: string
        apply_no?: string
        token_no?: string
    }

    // 个人商户基本信息入驻
    interface MerchantBasicdataIndvReq {
        upper_huifu_id: string
        req_seq_id: string
        reg_name: string
        req_date: string
        short_name: string
        sms_send_flag: string
        prov_id: string
        area_id: string
        district_id: string
        detail_addr: string
        contact_name: string
        contact_mobile_no: string
        contact_email: string
        card_info: string
    }

    interface MerchantBasicdataIndvRes {
        resp_code: string
        resp_desc: string
        huifu_id?: string
        apply_no?: string
        token_no?: string
    }

    // 商户详细信息查询

    interface MerchantBasicdataQueryReq {
        req_seq_id: string
        req_date: string
        huifu_id: string
    }

    interface MerchantBasicdataQueryRes {
        qry_wx_conf_list?: string
        resp_code: string
        resp_desc: string
        product_id?: string
        upper_huifu_id?: string
        reg_name: string
        cust_type: string
        short_name: string
        receipt_name?: string
        ent_type?: string
        license_type?: string
        license_code?: string
    }

    // 企业商户基本信息入驻

    interface MerchantBasicdataModifyReq {
        req_seq_id: string
        upper_huifu_id: string
        huifu_id: string
        req_date: string
        short_name?: string
        license_type?: string
        license_validity_type?: string
        license_begin_date?: string
        reg_prov_id?: string
        reg_area_id?: string
        reg_district_id?: string
        reg_detail?: string
        legal_name?: string
        legal_cert_type?: string
        legal_cert_validity_type?: string
        legal_cert_begin_date?: string
        prov_id?: string
        area_id?: string
        district_id?: string
        detail_addr?: string
        contact_name?: string
        contact_mobile_no?: string
        contact_email?: string
        service_phone?: string
        busi_type?: string
        receipt_name?: string
        mcc?: string
        card_info?: string
        tax_reg_pic?: string
        legal_cert_back_pic?: string
        legal_cert_front_pic?: string
        license_pic?: string
        org_code_pic?: string
        license_end_date?: string
        legal_cert_end_date?: string
    }

    // 企业商户基本信息入驻
    interface MerchantBasicdataModifyRes {
        resp_code: string
        resp_desc: string
        huifu_id?: string
        apply_no?: string
        token_no?: string
    }

    // 商户业务开通
    interface MerchantBusiOpenReq {
        req_seq_id: string
        upper_huifu_id: string
        huifu_id: string
        req_date: string
        short_name?: string
        wx_conf_list: string
    }

    // 商户业务开通
    interface MerchantBusiOpenRes {
        resp_code: string
        resp_desc: string
        req_seq_id: string
        req_date: string
        product_id: string
        huifu_id: string
        apply_no: string
    }

    // 申请单状态查询
    interface MerchantBasicdataStatusQueryReq {
        req_seq_id: string
        huifu_id: string
        req_date: string
        apply_no: string
    }
    interface MerchantBasicdataStatusQueryRes {
        resp_code: string
        resp_desc: string
        huifu_id?: string
        reg_name?: string
        apply_reason?: string
        apply_status?: string
        bank_card_conf_reason?: string
        bank_card_conf_status?: string
        bind_card_status?: string
        cash_status?: string
        reg_status?: string
        settle_status?: string
        union_sub_mer_id?: string
        union_conf_reason?: string
        union_conf_status?: string
        ali_conf_result_list?: string
        wx_conf_result_list?: string
        zft_apply_result_list?: string
        combine_pay_config?: string
        wx_config_list?: string
        account_name?: string
        electron_account?: string
        out_order_funds_status?: string
        out_order_funds_desc?: string
    }

    // 账户余额信息查询
    interface TradeAcctpaymentBalanceQueryReq {
        req_seq_id: string
        huifu_id: string
        req_date: string
    }
    interface TradeAcctpaymentBalanceQueryRes {
        acctInfo_list?: string
        resp_desc: string
        req_seq_id?: string
        req_date: string
        resp_code: string
    }

    // 财务流水查询
    interface tradeAcctpaymentAcctlogQueryReq {
        req_seq_id: string
        huifu_id: string
        acct_date: string
        page_size: string
        page_num: string
        acct_id?: string
    }

    interface TadeAcctpaymentAcctlogQueryReq {
        req_seq_id: string
        huifu_id: string
        acct_date: string
        page_size: string
        page_num: string
        acct_id?: string
    }
    interface TradeAcctpaymentAcctlogQueryRes {
        resp_code: string
        huifu_id: string
        resp_desc: string
        mer_name?: string
        mer_short_name?: string
        acct_type?: string
        acct_id?: string
        page_size?: string
        page_num?: string
        result_count?: string
        acct_log_list?: string
    }

    // 商户业务开通修改
    interface MerchantBusiModifyReq {
        req_seq_id: string
        huifu_id: string
        req_date: string
        short_name: string
        wx_conf_list: string
    }
    interface MerchantBusiModifyRes {
        resp_code: string
        huifu_id: string
        resp_desc: string
        apply_no: string
    }

    // 微信商户配置

    interface MerchantBusiConfigReq {
        req_seq_id: string
        req_date: string
        huifu_id: string
        fee_type: string
        wx_applet_app_id: string
        async_return_url: string
    }

    interface MerchantBusiConfigRes {
        resp_code: string
        resp_desc: string
        huifu_id: string
    }

    interface MerchantBusiConfigQueryReq {
        req_seq_id: string
        req_date: string
        huifu_id: string
    }

    interface MerchantBusiConfigQueryRes {
        resp_code: string
        resp_desc: string
        atu_config_bo_list: string
        atu_config_bo_fail_list: string
    }

    // 聚合正扫

    interface TradePaymentJspay {
        tradeType: 'T_MINIAPP' | 'T_H5'
        price: number
        huifuId: string
        orderId: string
        appWxaId: string
        openId: string
        goodsDesc: string
    }
    interface TradePaymentJspayReq {
        req_date: string
        req_seq_id: string
        huifu_id: string
        trade_type: string
        trans_amt: string
        goods_desc: string
        time_expire: string
        wx_data: string
        remark?: string
        notify_url?: string
    }

    interface TradePaymentJspayRes {
        resp_code: string
        resp_desc: string
        req_date: string
        req_seq_id: string
        trade_type: string
        trans_amt: string
        trans_stat: string
        pay_info: string
        huifu_id: string
        wx_response: string
        remark: string
    }

    // 聚合正扫查询
    interface TradePaymentScanpayQuery {
        orgReqDate: number
        huifuId: string
        orderId: string
    }
    interface TradePaymentScanpayQueryReq {
        org_req_date: string
        huifu_id: string
        org_hf_seq_id?: string
        org_req_seq_id?: string
        out_trans_id?: string
        party_order_id?: string
    }
    interface TradePaymentScanpayQueryRes {
        resp_code: string
        resp_desc: string
        org_req_date: string
        org_hf_seq_id?: string
        org_req_seq_id?: string
        out_trans_id?: string
        party_order_id?: string
        trans_type?: string
        delay_acct_flag: string
        div_flag: string
        huifu_id: string
        acct_date?: string
        bagent_id?: string
        bank_code?: string
        bank_desc?: string
        trans_amt: string
        debit_type?: string
        end_time: string
        fee_amt?: string
        fee_type?: string
        settlement_amt?: string
        trans_stat: string
        trans_time?: string
        wx_response?: string
        remark?: string
        wx_user_id?: string
    }

    // 扫码交易退款

    interface TradePaymentScanpayRefund {
        refundId: string
        huifuId: string
        refundPrice: number
        orgReqDate: number
        orderId: string
    }
    interface TradePaymentScanpayRefundReq {
        req_date: string
        req_seq_id: string
        huifu_id: string
        ord_amt: string
        org_req_date: string
        org_hf_seq_id?: string
        org_party_order_id?: string
        org_req_seq_id?: string
        notify_url?: string
        remark?: string
    }
    interface TradePaymentScanpayRefundRes {
        resp_code: string
        resp_desc: string
        huifu_id: string
        product_id: string
        req_seq_id: string
        hf_seq_id?: string
        req_date: string
        org_req_date?: string
        org_req_seq_id?: string
        trans_date?: string
        trans_time?: string
        trans_stat?: string
        ord_amt: string
        acct_split_bunch?: string
        remark?: string
    }

    // 退款查询
    interface TradePaymentScanpayRefundquery {
        huifuId: string
        orgReqDate: number
        orderRefundId: string
    }
    interface TradePaymentScanpayRefundqueryReq {
        huifu_id: string
        org_req_date: string
        org_hf_seq_id?: string
        org_req_seq_id?: string
        mer_ord_id?: string
    }
    interface TradePaymentScanpayRefundqueryRes {
        resp_code: string
        resp_desc: string
        huifu_id: string
        org_hf_seq_id?: string
        org_req_date?: string
        org_req_seq_id?: string
        ord_amt: string
        actual_ref_amt?: string
        trans_date?: string
        trans_time?: string
        trans_type?: string
        trans_stat: string
        bank_code?: string
        bank_message?: string
        fee_amt?: string
        acct_split_bunch?: string
        split_fee_info?: string
    }

    // 微信实名认证状态查询

    interface MerchantBusiRealnameQueryReq {
        req_seq_id: string
        req_date: string
        huifu_id: string
    }

    interface MerchantBusiRealnameQueryRes {
        resp_code: string
        resp_desc: string
        huifu_id: string
        applyment_stat: string
        authorize_stat: string
        reject_param?: string
        reject_reason?: string
        qrcode_data?: string
    }

    // 微信实名认证
    interface MerchantBusiRealnameReq {
        req_seq_id: string
        req_date: string
        huifu_id: string
        identification_address: string
        name: string
        mobile: string
        id_card_number: string
        contact_type: string
    }

    interface MerchantBusiRealnameRes {
        applyment_id: string
        huifu_id: string
        resp_code: string
        resp_desc: string
    }
    // 查询投诉单列表详情
    interface GetComplaintListReq {
        req_seq_id: string
        req_date: string
        begin_date: string
        end_date: string
        offset?: string
        limit?: string
        huifu_id?: string
        reg_name?: string
        transaction_id?: string
        complaint_id?: string
        complaint_state?: string
        user_complaint_times?: string
        incoming_user_response?: string
    }

    interface GetComplaintListRes {
        resp_code: string
        resp_desc: string
        offset: string
        limit: string
        total_count: string
        complaint_list: string
    }

    interface PaymentPreorderReq {
        pre_order_type: string,
        req_date: string,
        req_seq_id: string,
        huifu_id: string,
        trans_amt: string,
        goods_desc: string,
        checkout_id: string
        // miniapp_data: string
    }
    interface PaymentPreorderRes {
        resp_code: string,
        resp_desc: string,
        req_date: string,
        req_seq_id: string,
        huifu_id: string,
        trans_amt: string,
        pre_order_id: string
        miniapp_data: string
    }
}
