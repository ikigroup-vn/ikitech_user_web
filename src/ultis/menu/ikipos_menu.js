export const ikipos_menu = [
    {
        title: "Chức năng",
        link: [
            {
                name: "Tổng quan",
                class: "report_view",

                to: "/dashboard",
                icon: "fa fa-eye",

                exact: true,
            },
            {
                name: "Bán hàng tại quầy",
                class: "order_list",

                icon: "fa-credit-card",
                exact: true,
                to: "/pos_order",
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

                icon: "fas fa-th-large",
                open: "inventory",
                children: [
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Danh mục sản phẩm",
                        exact: true,
                        to: "/product/category",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Sản phẩm",
                        exact: true,
                        to: "/product/index",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Kho hàng",
                        exact: true,
                        to: "/product_inventory/index",
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

                icon: "fas fa-chart-bar",
                open: "report",
                children: [
                    {
                        class: "order_list",
                        display: "hide",
                        name: "Báo cáo chung",
                        exact: true,
                        to: "/report",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Báo cáo kho ",
                        exact: true,
                        to: "/report_inventory",
                    },
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Báo cáo tài chính",
                        exact: true,
                        to: "/report_finance",
                    },

                ],
            },



            // {
            //   name: "Lên đơn",
            //   class : "order_list",

            //   icon: "fa-credit-card",
            //   exact: true,
            //   to: "/addorder",
            // },
            // {
            //   name: "Chat với khách hàng",
            //   class : "chat_list",
            //   display : "hide",
            //   icon: "fa fa-comment-alt",
            //   exact: true,
            //   to: "/chat",
            // },

            {
                name: "Kho hàng",

                icon: "fas fa-store",
                open: "inventory",
                children: [
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Phiếu kiểm kho",
                        exact: true,
                        to: "/inventory/index",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Nhập hàng",
                        exact: true,
                        to: "/import_stocks/index",
                    },

                ],
            },


            {
                name: "Kế toán",
                class: "post_category_list",
                display: "hide",
                icon: "fas fa-file-text",
                exact: true,
                to: "/posts/category",
            },


            {
                name: "Khách hàng",

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
                        name: "Điểm thưởng",
                        exact: true,
                        to: "/reward_point",
                    },

                ],
            },

            {
                name: "Nhà cung cấp",
                class: "post_category_list",
                display: "hide",
                icon: "fas fa-building",
                exact: true,
                to: "/supplier",
            },

            // {
            //   name: "Đại lý",
            //   display : "hide",
            //   icon: "fa-home",
            //   exact: true,
            //   to: "/agency",
            //   itemHasTabName : "agency"
            // },



            // {
            //   name: "Cộng tác viên",
            //   display : "hide",
            //   icon: "fa-user",
            //   exact: true,
            //   to: "/collaborator",
            //   itemHasTabName : "collaborator"
            // },
            // {
            //     name: "Chương trình khuyến mại",
            //     icon: "fas fa-money-bill-alt",
            //     open: "promotion",
            //     children: [
            //         {
            //             name: "Giảm giá sản phẩm",
            //             class: "promotion_discount_list",
            //             display: "hide",
            //             icon: "fas-usd-circle",
            //             exact: true,
            //             to: "/discount",
            //         },
            //         {
            //             name: "Voucher giảm giá hóa đơn",
            //             class: "promotion_voucher_list",
            //             display: "hide",
            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/voucher",
            //         },
            //         {
            //             name: "Combo giảm giá",
            //             class: "promotion_combo_list",
            //             display: "hide",
            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/combo",
            //         },
            //     ],
            // },


            {
                name: "Cài đặt",

                icon: "fas fa-cogs",
                open: "setting",
                children: [
                    // {
                    //   name: "Chỉnh sửa giao diện",
                    //   class : "web_theme_edit",
                    //   display : "hide",
                    //   exact: true,
                    //   to: "/theme",
                    // },
                    {
                        name: "Chi nhánh",
                        class: "web_theme_edit",
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
                        name: "Cài đặt phân quyền",
                        class: "decentralization_list",
                        display: "hide",
                        exact: true,
                        to: "/decentralization/index",
                    },
                    {
                        name: "Giảm giá sản phẩm",
                        class: "promotion_discount_list",
                        display: "hide",
                        icon: "fas-usd-circle",
                        exact: true,
                        to: "/discount",
                    },
                    {
                        name: "Voucher giảm giá hóa đơn",
                        class: "promotion_voucher_list",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/voucher",
                    },
                    {
                        name: "Combo giảm giá",
                        class: "promotion_combo_list",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/combo",
                    },
                    {
                        name: "Cài đặt chung",
                        class: "web_theme_edit",
                        display: "hide",
                        exact: true,
                        to: "/setting/index",
                    },
                ],
            },










            // {
            //     name: "Khác",
            //     icon: "fas fa-th-list",
            //     open: "another",
            //     children: [
            //         {
            //             name: "Địa chỉ cửa hàng",
            //             class: "delivery_pick_address_list",
            //             display: "hide",
            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/store_address",
            //         },
            //         {
            //             name: "Đơn vị vận chuyển",
            //             class: "delivery_provider_update",


            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/shipment",
            //         },
            //         {
            //             name: "Phương thức thanh toán",
            //             class: "payment_list",
            //             display: "hide",
            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/payment",
            //         },



            //         {
            //             name: "Đánh giá",
            //             class: "customer_review_list",
            //             display: "hide",
            //             icon: "fas fa-fw fa-cog",
            //             exact: true,
            //             to: "/review",
            //         },
            //         // {
            //         //   name: "Thông báo",
            //         //   icon: "fas fa-fw fa-cog",
            //         //   exact: true,
            //         //   to: "/notification",
            //         // },
            //     ],
            // },
        ],
    },
    // {
    //     title: "Quản lý thông báo",
    //     link: [
    //         {
    //             name: "Lên lịch thông báo",
    //             class: "notification_schedule_list",
    //             display: "hide",
    //             icon: "fa fa-bell",
    //             exact: true,
    //             to: "/notifications/schedule",
    //         },
    //         {
    //             name: "Cài đặt Popup",
    //             class: "popup_list",
    //             display: "hide",
    //             icon: "fa fa-bell",
    //             exact: true,
    //             to: "/popup",
    //         },
    //     ],
    // },
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
                isVip: true
            },
        ],
    },


];