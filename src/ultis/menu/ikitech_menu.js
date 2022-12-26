export const ikitech_menu = [
  {
    title: "Menu",
    link: [
      {
        name: "Tổng quan",
        class: null,

        to: "/dashboard",
        icon: "fa fa-eye",

        exact: true,
      },

      {
        name: "Bán hàng tại quầy",
        class: "create_order_pos",

        icon: "fa-credit-card",
        exact: true,
        to: "/pos",
      },
      {
        name: "Đơn hàng",
        class: "order_list",

        icon: "fa-file-invoice",
        exact: true,
        to: "/order",
      },

      {
        name: "Sản phẩm",
        setOpenKey: ["/product/"],

        icon: "fas fa-th-large",
        open: "product",
        children: [
          {
            class: "product_category_list",
            display: "hide",
            name: "Danh mục sản phẩm",
            exact: true,
            to: "/product/category",
          },
          {
            class: "product_list",
            display: "hide",
            name: "Sản phẩm",
            exact: true,
            to: "/product/index",
          },

          // {
          //     class: "customer_config_point",
          //     display: "hide",
          //     name: "In mã vạch",
          //     exact: true,
          //     to: "/product/index",
          // },
        ],
      },

      {
        name: "Kho",
        setOpenKey: [
          "/product_inventory/index",
          "/inventory/index",
          "/import_stocks/index",
          "/transfer_stocks/index",
          "/supplier",
        ],

        icon: "fas fa-store",
        open: "inventory",
        children: [
          {
            class: "inventory_list",
            display: "hide",
            name: "Tồn kho",
            exact: true,
            to: "/product_inventory/index",
          },
          {
            class: "inventory_tally_sheet",
            display: "hide",
            name: "Phiếu kiểm kho",
            exact: true,
            to: "/inventory/index",
          },
          {
            class: "inventory_import",
            display: "hide",
            name: "Nhập hàng",
            exact: true,
            to: "/import_stocks/index",
          },
          {
            class: "transfer_stock",
            display: "hide",
            name: "Chuyển kho",
            exact: true,
            to: "/transfer_stocks/index",
          },
          {
            name: "Nhà cung cấp",
            class: "supplier",
            display: "hide",
            exact: true,
            to: "/supplier",
          },
        ],
      },

      {
        name: "Tin tức - Bài viết",
        setOpenKey: ["/posts/category", "/posts/index"],

        icon: "fas fa-newspaper",
        open: "posts",
        children: [
          {
            class: "post_list",
            display: "hide",
            name: "Danh mục bài viết",
            exact: true,
            to: "/posts/category",
          },
          {
            class: "post_list",
            display: "hide",
            name: "Tin tức - Bài viết",
            exact: true,
            to: "/posts/index",
          },

          // {
          //     class: "customer_config_point",
          //     display: "hide",
          //     name: "In mã vạch",
          //     exact: true,
          //     to: "/product/index",
          // },
        ],
      },

      {
        name: "Báo cáo",
        setOpenKey: ["/report", "/report_"],

        icon: "fas fa-chart-bar",
        open: "report",
        children: [
          {
            class: "report_overview",
            display: "hide",
            name: "Báo cáo chung",
            exact: true,
            to: "/report",
          },
          {
            class: "report_inventory",
            display: "hide",
            name: "Báo cáo kho ",
            exact: true,
            to: "/report_inventory",
          },
          {
            class: "report_finance",
            display: "hide",
            name: "Báo cáo tài chính",
            exact: true,
            to: "/report_finance",
          },
          // {
          //   class: "report_finance",
          //   display: "hide",
          //   name: "Thu chi",
          //   exact: true,
          //   to: "/revenue_expenditure",
          // },
        ],
      },
      {
        name: "Kế toán",
        setOpenKey: ["/revenue_expenditure", "/accountant/time_sheet/"],

        icon: "fas fa-coins",
        open: "revenue_expenditure",
        children: [
          {
            class: "report_finance",
            display: "hide",
            name: "Thu chi",
            exact: true,
            to: "/revenue_expenditure",
          },

          {
            name: "Bảng công",
            class: "timekeeping",

            display: "hide",
            icon: "fas fa-fw fa-calendar-days",
            exact: true,
            to: "/accountant/time_sheet",
          },
        ],
      },
      {
        name: "Khách hàng",
        setOpenKey: ["/customer", "/reward_point", "chat", "/group_customer"],
        ExcludeSetOpenKey: ["customer_sales"],
        icon: "fas fa-user",
        open: "customer",
        children: [
          {
            class: "customer_list",
            display: "hide",
            name: "Danh sách khách hàng",
            exact: true,
            to: "/customer",
          },
          {
            class: "customer_config_point",
            display: "hide",
            name: "Xu thưởng",
            exact: true,
            to: "/reward_point",
          },
          {
            name: "Chat với khách hàng",
            class: "chat_list",
            display: "hide",
            icon: "fa fa-comment-alt",
            exact: true,
            to: "/chat",
          },
          {
            name: "Nhóm khách hàng",
            class: "chat_list",
            display: "hide",
            icon: "fa fa-comment-alt",
            exact: true,
            to: "/group_customer",
          },
        ],
      },
      {
        name: "Đối tác bán hàng",
        setOpenKey: ["/collaborator", "/agency"],
        icon: "fa fa-user",
        open: "setting2",
        children: [
          {
            name: "Cộng tác viên",
            class: "collaborator_list",
            display: "hide",
            exact: true,
            to: "/collaborator",
          },
          {
            name: "Đại lý",
            class: "agency_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/agency",
          },
        ],
      },
      {
        name: "Onsale",
        setOpenKey: ["/customer_sales"],
        icon: "fas fa-user",
        open: "onsale",
        children: [
          {
            class: "onsale",
            display: "hide",
            name: "Tất cả",
            exact: true,
            params: "?status=",

            to: "/customer_sales",
          },
          {
            class: "onsale",
            display: "hide",
            name: "Cần tư vấn",
            exact: true,
            params: "?status=0",

            to: "/customer_sales",
          },
          {
            class: "onsale",
            display: "hide",
            name: "Đang tư vấn",
            exact: true,
            params: "?status=1",
            to: "/customer_sales",
          },
          {
            class: "onsale",
            display: "hide",
            name: "Thành công",
            exact: true,
            params: "?status=2",

            to: "/customer_sales",
          },
          {
            class: "onsale",
            display: "hide",
            name: "Thất bại",

            exact: true,
            params: "?status=3",

            to: "/customer_sales",
          },
        ],
      },

      // {
      //   class: "revenue_expenditure",
      //   name: "Kế toán",
      //   display: "hide",
      //   icon: "fa-coins",
      //   exact: true,
      //   to: "/accountant",
      //   itemHasTabName: "agency",
      // },

      {
        name: "Chấm công",
        icon: "fa fa-calendar",
        class: "timekeeping",
        setOpenKey: [
          "/shift",
          "/calendar_shift",
          "/time_sheet",
          "/work_location",
          "/request",
        ],
        ExcludeSetOpenKey: ["/accountant/time_sheet/"],

        open: "timekeeping",

        children: [
          {
            class: "timekeeping",
            name: "Ca làm việc",
            display: "hide",
            icon: "fas fa-clock-nin",
            exact: true,
            to: "/shift",

            // class: "timekeeping_shift",
          },
          {
            name: "Lịch làm việc",
            class: "timekeeping",
            display: "hide",
            icon: "fas fa-fw fa-calendar-days",
            exact: true,
            to: "/calendar_shift",
          },
          {
            name: "Bảng công",
            class: "timekeeping",

            display: "hide",
            icon: "fas fa-fw fa-calendar-days",
            exact: true,
            to: "/time_sheet",
          },
          {
            name: "Địa điểm làm việc",
            class: "timekeeping",
            display: "hide",
            icon: "fas fa-fw fa-location-dot",

            exact: true,
            to: "/work_location",
          },
          {
            name: "Xử lý yêu cầu",
            class: "timekeeping",
            display: "hide",
            icon: "fas fa-fw fa-location-dot",

            exact: true,
            to: "/request",
          },
        ],
      },
      {
        name: "Đào tạo",
        class: "train",

        icon: "fas fa-book-open",
        exact: true,
        to: "/train/course",
      },
      // {
      //   name: "Đào tạo",
      //   icon: "fas fa-book-open",
      //   class: "timekeeping",
      //   setOpenKey : ["/shift" , "/calendar_shift" , "/time_sheet" , "/work_location" , "/request"],
      //   ExcludeSetOpenKey : ["/accountant/time_sheet/"],

      //   open: "timekeeping",

      //   children: [

      //     {

      //       name: "Khóa học",
      //       class: "timekeeping",
      //       display: "hide",
      //       icon: "fas fa-fw fa-location-dot",

      //       exact: true,
      //       to: "/train/course",
      //     },
      //     // {

      //     //   name: "Chương - Bài học",
      //     //   class: "timekeeping",
      //     //   display: "hide",
      //     //   icon: "fas fa-book",

      //     //   exact: true,
      //     //   to: "/train/lesson",
      //     // },
      //   ],
      // },

      {
        class: "promotion",
        name: "Chương trình khuyến mại",
        icon: "fas fa-money-bill-alt",
        setOpenKey: ["/discount", "/voucher", "/combo", "/bonus_product"],

        open: "promotion",
        children: [
          {
            name: "Giảm giá sản phẩm",
            class: "promotion",
            display: "hide",
            icon: "fas-usd-circle",
            exact: true,
            to: "/discount",
          },
          {
            name: "Voucher giảm giá hóa đơn",
            class: "promotion",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/voucher",
          },
          {
            name: "Combo giảm giá",
            class: "promotion",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/combo",
          },
          {
            name: "Thưởng sản phẩm",
            class: "promotion",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/bonus_product",
          },
        ],
      },

      {
        name: "Cài đặt",

        icon: "fas fa-cogs",
        setOpenKey: [
          "/theme",
          "/branch/index",
          "/staff/index",
          "/decentralization/index",
        ],

        open: "setting",
        children: [
          {
            name: "Chỉnh sửa website",
            class: "web_theme_edit",
            display: "hide",
            exact: true,
            to: "/theme",
          },

          {
            name: "Chi nhánh",
            class: "branch_list",
            display: "hide",
            exact: true,
            to: "/branch/index",
          },
          {
            name: "Nhân viên",
            class: "staff_list",
            display: "hide",
            exact: true,
            to: "/staff/index",
          },

          {
            name: "Chọn mẫu in",
            class: "config_setting",
            display: "hide",
            exact: true,
            to: "/invoice_template/index",
          },
          {
            name: "Cài đặt phân quyền",
            class: "decentralization_list",
            display: "hide",
            exact: true,
            to: "/decentralization/index",
          },

          {
            name: "Cài đặt quảng cáo",
            display: "hide",
            exact: true,
            to: "/banner_ads",
            class: "web_theme_edit",
          },

          {
            name: "Cài đặt chung",
            class: "config_setting",
            display: "hide",
            exact: true,
            to: "/setting/index",
          },
        ],
      },

      {
        name: "Khác",
        icon: "fas fa-th-list",
        open: "another",
        setOpenKey: [
          "/store_address",
          "/shipment",
          "payment",
          "review",
          "/notifications/schedule",
          "popup",
        ],

        children: [
          {
            name: "Địa chỉ giao vận",
            class: "delivery_pick_address_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/store_address",
          },
          {
            name: "Đơn vị vận chuyển",
            class: "delivery_pick_address_list",

            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/shipment",
          },

          {
            name: "Phương thức thanh toán",
            class: "payment_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/payment",
          },

          {
            name: "Đánh giá",
            class: "customer_review_list",
            display: "hide",
            icon: "fas fa-fw fa-cog",
            exact: true,
            to: "/review",
          },
          {
            name: "Lên lịch thông báo",
            class: "notification_schedule_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/notifications/schedule",
          },
          {
            name: "Lịch sử thao tác",
            class: "notification_schedule_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/history_operation",
          },
          {
            name: "Hỗ trợ & hướng dẫn",
            class: "notification_schedule_list",
            display: "hide",
            icon: "fa fa-bell",
            exact: true,
            to: "/manual",
          },
        ],
      },
    ],
  },

  {
    title: "Cài đặt riêng",
    link: [
      {
        class: "isVip",
        display: "hide",
        name: "Cài đặt cho VIP",
        icon: "fa-suitcase",
        exact: true,
        to: "/vip",
        isVip: true,
      },
    ],
  },
];
