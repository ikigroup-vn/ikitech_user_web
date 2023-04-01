export const ecommerceStatus = [
  {
    name: "TIKI",
    data: [
      {
        name: "Đơn hàng mới",
        key: "new_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Tiki đã tiếp nhận đơn hàng và đang chờ nhà bán xác nhận",
            status: "queueing",
          },
          {
            name: "Đơn hàng đã bàn giao đối tác",
            status: "handover_to_partner",
          },
          {
            name: "Đơn hàng đang được xử lý",
            status: "processing",
          },
        ],
      },
      {
        name: "Đơn hàng vận chuyển",
        key: "ship_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Giao hành thành công",
            status: "successful_delivery,delivered",
          },
          {
            name: "Đơn hàng đang được đóng gói",
            status: "packaging",
          },
          {
            name: "Shipper đang lấy hàng",
            status: "picking",
          },
          {
            name: "Shipper đang vận chuyển",
            status: "shipping",
          },
          {
            name: "Đơn hàng sẵn sàng được giao",
            status: "ready_to_ship",
          },
          {
            name: "Đơn hàng đã đóng gói xong",
            status: "finished_packing",
          },
        ],
      },
      {
        name: "Đơn hàng sự cố",
        key: "problem_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Đã hủy",
            status: "canceled",
          },
          {
            name: "Đơn hàng đã đóng",
            status: "closed",
          },
          {
            name: "Đơn hàng đang được giữ lại để xử lý các vấn đề phát sinh",
            status: "holded",
          },
          {
            name: "Đơn hàng đã được trả",
            status: "returned",
          },
        ],
      },
      {
        name: "Thanh toán",
        key: "payment_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Đơn hàng đợi thanh toán",
            status: "waiting_payment",
          },
          {
            name: "Đã thanh toán",
            status: "paid",
          },
          {
            name: "Xem xét thanh toán",
            status: "payment_review",
          },
        ],
      },
      {
        name: "Thành công",
        key: "success_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Thành công",
            status: "complete",
          },
        ],
      },
    ],
  },
  {
    name: "LAZADA",
    data: [
      {
        name: "Đơn hàng mới",
        key: "new_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Chờ xử lý",
            status: "pending",
          },
        ],
      },
      {
        name: "Đơn hàng vận chuyển",
        key: "ship_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Sẵn sàng vận chuyển",
            status: "ready_to_ship",
          },
          {
            name: "Đã vận chuyển",
            status: "delivered",
          },
          {
            name: "Đã đóng gói",
            status: "topack",
          },
          {
            name: "Đang giao",
            status: "toship,shipping",
          },
        ],
      },
      {
        name: "Đơn hàng sự cố",
        key: "problem_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Đã hủy",
            status: "canceled",
          },
          {
            name: "Đơn hàng lỗi",
            status: "failed",
          },
          {
            name: "Đơn hàng đã được trả",
            status: "returned",
          },
          {
            name: "Thất lạc",
            status: "lost",
          },
        ],
      },
      {
        name: "Thanh toán",
        key: "payment_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Chưa thanh toán",
            status: "unpaid",
          },
        ],
      },
      {
        name: "Thành công",
        key: "success_orders",
        is_show_status: true,
        data_children: [
          {
            name: "Đã giao thành công",
            status: "shipped",
          },
        ],
      },
    ],
  },
];
