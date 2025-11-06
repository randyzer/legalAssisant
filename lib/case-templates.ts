// 证据清单模板

export const evidenceTemplates = {
  loan: [
    {
      id: "E1",
      title: "借款协议/合同",
      category: "document",
      purpose: "证明借款关系成立及条款内容",
      sourceHint: "双方签署的书面协议",
    },
    {
      id: "E2",
      title: "转账凭证/收据",
      category: "document",
      purpose: "证明借款已支付",
      sourceHint: "银行转账截图或支付宝/微信转账记录",
    },
    {
      id: "E3",
      title: "欠条/借据",
      category: "document",
      purpose: "证明债权债务关系",
      sourceHint: "被告出具或确认的欠条原件",
    },
    {
      id: "E4",
      title: "催款记录",
      category: "record",
      purpose: "证明原告的催要行为",
      sourceHint: "短信、微信、电话记录截图",
    },
    {
      id: "E5",
      title: "证人证言",
      category: "testimony",
      purpose: "证明借款事实",
      sourceHint: "见证人的书面证言",
    },
    {
      id: "E6",
      title: "其他相关证据",
      category: "other",
      purpose: "其他能证明案件事实的证据",
      sourceHint: "如邮件往来、合同修改记录等",
    },
  ],
  consumer: [
    {
      id: "E1",
      title: "消费凭证",
      category: "document",
      purpose: "证明消费关系成立",
      sourceHint: "购物小票、发票、订单截图",
    },
    {
      id: "E2",
      title: "支付凭证",
      category: "document",
      purpose: "证明已支付价款",
      sourceHint: "转账、刷卡记录",
    },
    {
      id: "E3",
      title: "产品/服务不符证据",
      category: "physical",
      purpose: "证明产品或服务质量问题",
      sourceHint: "产品照片、缺陷说明、检测报告",
    },
    {
      id: "E4",
      title: "沟通记录",
      category: "record",
      purpose: "证明消费者的投诉和商家的拒绝",
      sourceHint: "微信、邮件、客服聊天记录",
    },
    {
      id: "E5",
      title: "退货记录",
      category: "document",
      purpose: "证明退货/退款申请",
      sourceHint: "退货单、退款申请截图",
    },
    {
      id: "E6",
      title: "第三方鉴定",
      category: "inspection",
      purpose: "证明产品质量或损害程度",
      sourceHint: "质检机构出具的鉴定报告",
    },
  ],
  tenancy: [
    {
      id: "E1",
      title: "租赁合同",
      category: "document",
      purpose: "证明租赁关系及押金约定",
      sourceHint: "双方签署的书面租赁合同",
    },
    {
      id: "E2",
      title: "押金支付凭证",
      category: "document",
      purpose: "证明已支付押金及金额",
      sourceHint: "转账记录、收据",
    },
    {
      id: "E3",
      title: "入住/退房检查记录",
      category: "document",
      purpose: "证明房屋状态和交付情况",
      sourceHint: "入住时拍照、退房时的检查记录",
    },
    {
      id: "E4",
      title: "维修费用清单",
      category: "document",
      purpose: "如房东扣押金进行维修，证明费用合理性",
      sourceHint: "维修发票、报价单、照片",
    },
    {
      id: "E5",
      title: "催还记录",
      category: "record",
      purpose: "证明租客催要押金的努力",
      sourceHint: "短信、微信、邮件记录",
    },
    {
      id: "E6",
      title: "其他证据",
      category: "other",
      purpose: "其他证明押金纠纷的证据",
      sourceHint: "如中介记录、见证人证言等",
    },
  ],
}

// 法律依据模板
export const legalReferences = {
  loan: [
    {
      name: "民法典",
      article: "第六百七十五条",
      summary: "借款的内容包括借款种类、币种、用途、数额、利率、期限和还款方式等条款。",
    },
    {
      name: "民法典",
      article: "第六百八十八条",
      summary: "借款人应当按照约定的期限返还借款。",
    },
  ],
  consumer: [
    {
      name: "消费者权益保护法",
      article: "第十六条",
      summary: "经营者应当保证其提供的商品或者服务符合保障人身、财产安全的要求。",
    },
  ],
  tenancy: [
    {
      name: "民法典",
      article: "第七百零一条",
      summary: "承租人应当按照约定的方法使用租赁物。对租赁物造成损失的，应当赔偿损失。",
    },
  ],
}
