export const ikitech_menu =  [
    {
      title: "Quản lý danh sách",
      link: [
        {
          name: "Tổng quan",
          class : "report_view",

          to: "/dashboard",
          icon: "fa fa-eye",

          exact: true,
        },

        {
          name: "Báo cáo",
    
          icon: "fas fa-store",
          open : "report",
          children: [
            {
              class : "order_list",
              display : "hide",
              name: "Báo cáo chung",
              exact: true,
              to: "/report",
            },
            {
              class : "customer_config_point",
              display : "hide",
              name: "Báo cáo kho ",
              exact: true,
              to: "/report_inventory",
            },
            {
              class : "customer_list",
              display : "hide",
              name: "Báo cáo tài chính",
              exact: true,
              to: "/report_finance",
            },
      
          ],
        },

        {
          name: "Đơn hàng",
          class : "order_list",

          icon: "fa-file-invoice",
          exact: true,
          to: "/order",
        },
        {
          name: "Bán hàng tại quầy",
          class : "order_list",

          icon: "fa-file-invoice",
          exact: true,
          to: "/pos_order",
        },
        {
          name: "Lên đơn",
          class : "order_list",

          icon: "fa-credit-card",
          exact: true,
          to: "/addorder",
        },
        {
          name: "Chat với khách hàng",
          class : "chat_list",
          display : "hide",
          icon: "fa fa-comment-alt",
          exact: true,
          to: "/chat",
        },

        {
          name: "Kho hàng",
    
          icon: "fas fa-store",
          open : "inventory",
          children: [
            {
              class : "customer_list",
              display : "hide",
              name: "Phiếu kiểm kho",
              exact: true,
              to: "/inventory/index",
            },
            {
              class : "customer_config_point",
              display : "hide",
              name: "Nhập hàng",
              exact: true,
              to: "/import_stocks/index",
            },
      
          ],
        },
        {
          name: "Danh mục sản phẩm",
          class : "product_category_list",
          icon: "fa-list",
          exact: true,
          to: "/product/category",
        },
        {
          name: "Sản phẩm",
          class : "product_list",

          icon: "fa-boxes",
          exact: true,
          to: "/product/index",
        },
  


        {
          name: "Danh mục bài viết",
          class : "post_category_list",
          display : "hide",
          icon: "fa-list",
          exact: true,
          to: "/posts/category",
        },
        {
          name: "Tin tức bài viết",
          class : "post_list",
          display : "hide",
          icon: "fa-newspaper",
          exact: true,
          to: "/posts",
        },





        {
          name: "Khách hàng",
    
          icon: "fas fa-user",
          open : "customer",
          children: [
            {
              class : "customer_list",
              display : "hide",
              name: "Danh sách khách hàng",
              exact: true,
              to: "/customer",
            },
            {
              class : "customer_config_point",
              display : "hide",
              name: "Điểm thưởng",
              exact: true,
              to: "/reward_point",
            },
      
          ],
        },


        {
          name: "Đại lý",
          display : "hide",
          icon: "fa-home",
          exact: true,
          to: "/agency",
          itemHasTabName : "agency"
        },


     
        {
          name: "Cộng tác viên",
          display : "hide",
          icon: "fa-user",
          exact: true,
          to: "/collaborator",
          itemHasTabName : "collaborator"
        },
        {
          name: "Chương trình khuyến mại",
          icon: "fas fa-money-bill-alt",
          open : "promotion",
          children: [
            {
              name: "Giảm giá sản phẩm",
              class : "promotion_discount_list",
              display : "hide",
              icon: "fas-usd-circle",
              exact: true,
              to: "/discount",
            },
            {
              name: "Voucher giảm giá hóa đơn",
              class : "promotion_voucher_list",
              display : "hide",
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/voucher",
            },
            {
              name: "Combo giảm giá",
              class : "promotion_combo_list",
              display : "hide",
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/combo",
            },
          ],
        },
  

        {
          name: "Cài đặt",
    
          icon: "fas fa-cogs",
          open : "setting",
          children: [
            {
              name: "Chỉnh sửa giao diện",
              class : "web_theme_edit",
              display : "hide",
              exact: true,
              to: "/theme",
            },
            {
              name: "Chỉnh sửa chi nhánh",
              class : "web_theme_edit",
              display : "hide",
              exact: true,
              to: "/branch/index",
            },
            {
              name: "Nhà cung cấp",
              class : "web_theme_edit",
              display : "hide",
              exact: true,
              to: "/supplier",
            },
            {
              name: "Cài đặt phân quyền",
              class : "decentralization_list",
              display : "hide",
              exact: true,
              to: "/decentralization/index",
            },
            {
              name: "Nhân viên",
              class : "staff_list",
              display : "hide",
              exact: true,
              to: "/staff/index",
            },
            {
              name: "Cài đặt quảng cáo",
              display : "hide",
              exact: true,
              to: "/banner_ads",
            },
          ],
        },




    
    
       
       

        
        {
          name: "Khác",
          icon: "fas fa-th-list",
          open : "another",
          children: [
            {
              name: "Địa chỉ cửa hàng",
              class : "delivery_pick_address_list",
              display : "hide",
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/store_address",
            },
            {
              name: "Đơn vị vận chuyển",
              class : "delivery_provider_update",

              
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/shipment",
            },
            {
              name: "Phương thức thanh toán",
              class : "payment_list",
              display : "hide",
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/payment",
            },
           
           
          
            {
              name: "Đánh giá",
              class : "customer_review_list",
              display : "hide",
              icon: "fas fa-fw fa-cog",
              exact: true,
              to: "/review",
            },
            // {
            //   name: "Thông báo",
            //   icon: "fas fa-fw fa-cog",
            //   exact: true,
            //   to: "/notification",
            // },
          ],
        },
      ],
    },
    {
      title: "Quản lý thông báo",
      link: [
        {
          name: "Lên lịch thông báo",
          class : "notification_schedule_list",
          display : "hide",
          icon: "fa fa-bell",
          exact: true,
          to: "/notifications/schedule",
        },
        {
          name: "Cài đặt Popup",
          class : "popup_list",
          display : "hide",
          icon: "fa fa-bell",
          exact: true,
          to: "/popup",
        },
      ],
    },
    {
      title: "Cài đặt riêng",
      link: [
        {
          class : "isVip",
          display : "hide",
          name: "Cài đặt cho VIP",
          icon: "fa-suitcase",
          exact: true,
          to: "/vip",
          isVip : true
        },
      ],
    },


  ];