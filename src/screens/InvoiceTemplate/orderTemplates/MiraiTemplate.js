import React, { forwardRef } from "react";
import BarcodeComponent from "../../../components/Partials/Barcode";
import { branch } from "../../../reducers/branch/branch";
import { formatNumberV2 } from "../../../ultis/helpers";

const MiraiTemplate = forwardRef((props, ref) => {
  const { currentBranch, badges, bill, store } = props;
  function getColor(item) {
    return item.distributes_selected.filter(
      (e) => e.name.toLowerCase() == "màu"
    )?.[0]?.value;
  }
  function getBrand(item) {
    return item.product.attributes.filter((e) => e.name == "Thương hiệu")?.[0]
      ?.value;
  }

  function mappingBillData() {
    let result = [];
    bill.line_items.forEach((item) => {
      result.push({
        name: `${item.product.name} ${getColor(item) ? getColor(item) : ''}`,
        imei: null,
        brand: getBrand(item),
        color: getColor(item),
        status: null,
        price: `${formatNumberV2(item.before_discount_price)} 円`,
        quantity: item.quantity,
        total: `${formatNumberV2(
          item.before_discount_price * item.quantity
        )} 円`,
      });
    });
    if (bill.total_shipping_fee) {
      result.push({
        name: "Phí vận chuyển",
        imei: null,
        brand: null,
        color: null,
        status: null,
        price: `${formatNumberV2(bill.total_shipping_fee)} 円`,
        quantity: 1,
        total: `${formatNumberV2(bill.total_shipping_fee)} 円`,
      });
    }
    result.push({
      name: "Total",
      imei: null,
      brand: null,
      color: null,
      status: null,
      price: null,
      quantity: result.reduce((acc, item) => acc + item.quantity, 0),
      total: `${formatNumberV2(bill.total_final)} 円`,
    });
    return result;
  }
  return (
    <div
      ref={ref}
      className="mirai-receipt"
      style={{ margin: "30px", fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>MIRAIMOBILE</h3>
        <div style={{ textAlign: "left", fontSize: "16px" }}>
          <div>東京都豊島区南大塚 3-30-3 南大塚アロービル 7 階</div>
          <div>Tel: {currentBranch.phone}</div>
        </div>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "36px",
            marginBottom: "20px",
          }}
        >
          店頭買取依書
        </div>
      </div>

      {/* Customer Info Section */}
      <div style={{ marginBottom: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ visibility: "hidden" }}>
            <tr>
              <th style={{ width: "10%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "15%" }}></th>
              <th style={{ width: "15%" }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={1}
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                }}
              >
                <div>フリガナ</div>
                <div>Họ tên (Katakana)</div>
              </td>
              <td
                colSpan={3}
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                }}
              ></td>
              <td
                colSpan={3}
                style={{
                  width: "40%",
                  border: "1px solid #000",
                  padding: "15px",
                  verticalAlign: "top",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  生年月日..................年..............月..............日
                </div>
                <div>(Ngày Tháng Năm sinh)</div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={1}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                <div>名前</div>
                <div>Họ tên</div>
              </td>
              <td
                colSpan={3}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                {bill.customer.name}
              </td>
              <td
                colSpan={3}
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  verticalAlign: "top",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <span>性別 男・女</span>
                    <div>Giới tính Nam・Nữ</div>
                  </div>
                  <div>
                    <span>年齢 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <div style={{ textAlign: "center" }}>Tuổi</div>
                  </div>
                  <div>歳</div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={1}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                <div>住所</div>
                <div>Địa chỉ</div>
              </td>
              <td
                colSpan={6}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                〒 {bill.customer_address_detail}
              </td>
            </tr>
            <tr>
              <td
                colSpan={1}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                <div>電話番号</div>
                <div>Số ĐT</div>
              </td>
              <td
                colSpan={2}
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                }}
              >
                {bill.customer_phone}
              </td>
              <td
                colSpan={4}
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <div>職業：　会社員・自営業・学生・その他（　　　　）</div>
                <div>
                  Nghề nghiệp: NV công ty・Chủ doanh nghiệp・Học sinh・Khác
                  (　　　)
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={1}
                style={{ border: "1px solid #000", padding: "8px" }}
              >
                <div>決済</div>
                <div>Thanh toán</div>
              </td>
              <td
                colSpan={6}
                style={{
                  border: "1px solid #000",
                  paddingLeft: "60px",
                  paddingRight: "280px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid #000",
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                        display: "inline-block",
                      }}
                    >
                      {/* Empty div for checkbox */}
                    </div>
                    <div>現金</div>
                    <div style={{ marginLeft: "4px" }}>
                      Thanh toán khi nhận hàng
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid #000",
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                        display: "inline-block",
                      }}
                    >
                      {/* Empty div for checkbox */}
                    </div>
                    <div>振込</div>
                    <div style={{ marginLeft: "4px" }}>Chuyển khoản</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Product List */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <u
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              backgroundColor: "#f5f5f5",
              padding: "5px",
              display: "inline-block",
            }}
          >
            買取商品情報
          </u>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>商品名(色)</div>
                <div style={{ textAlign: "center" }}>Tên sản phẩm (Màu)</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>商品番号</div>
                <div style={{ textAlign: "center" }}>Số sản phẩm (IMEI)</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>メーカー</div>
                <div style={{ textAlign: "center" }}>キャリア</div>
                <div style={{ textAlign: "center" }}>Hãng sản xuất</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>状態</div>
                <div style={{ textAlign: "center" }}>Tình trạng</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>単価</div>
                <div style={{ textAlign: "center" }}>Đơn giá</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div style={{ textAlign: "center" }}>数量</div>
                <div style={{ textAlign: "center" }}>Số lượng</div>
              </th>
              <th
                style={{
                  border: "1px solid #000",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <div>金額</div>
                <div>Tổng tiền</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {mappingBillData().map((item) => (
              <tr key={item.name}>
                {item.name == "Total" ? (
                  <td
                    colSpan="5"
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>合計金額</div>
                    <div style={{ textAlign: "center" }}>
                      Tổng tiền thanh toán
                    </div>
                  </td>
                ) : (
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                    }}
                  >
                    {item.name}
                  </td>
                )}
                {item.name != "Total" && (
                  <td style={{ border: "1px solid #000", padding: "8px" }}></td>
                )}
                {item.name != "Total" && (
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {item.brand}
                  </td>
                )}
                {item.name != "Total" && (
                  <td style={{ border: "1px solid #000", padding: "8px" }}></td>
                )}
                {item.name != "Total" && (
                  <td style={{ border: "1px solid #000", padding: "8px" }}>
                    {item.price}
                  </td>
                )}
                <td style={{ border: "1px solid #000", padding: "8px" }}>
                  {item.quantity}
                </td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terms and Conditions */}
      <div style={{ marginBottom: "20px", fontSize: "16px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          【ご確認事項】
        </div>
        <ol style={{ paddingLeft: "20px", margin: "0" }}>
          <li>
            未成年の方からの商品の買取は(保護者の同意書がない限り)お断りしております。
          </li>
          <li>
            模倣品・偽造品・海賊品・盗難紛失品・不正入手した端末など買取できません。
          </li>
          <li>
            おまかせロック設定された携帯端末は、お取引出来ません
            <div>
              ※
              当店との売買成立後に不正が見つかった場合、(身分証明書偽造、第三者のものであった場合や盗難品や遠隔ロック
            </div>
            <div>
              等)が発覚した場合、損害賠償請求を行うことがあります。(上記事項に該当した場合は返金、損害賠償請求を行
              い、所轄の警察署へ通報致します。
            </div>
          </li>
          <li>
            ご本人確認のため、身分証を確認いたします(確認出来ない場合お取引出来ません)。
          </li>
          <li>買取成立後(お振込後)のご返品は出来ませんのでご了承下さい。</li>
          <li>
            携帯端末のデータを初期化して、ご購入時の状態に戻して下さい。SIM
            カードを抜いて携帯端末を白ロム状態にします。上記 SIM
            カードの外し忘れ、初期化の忘れ等において万が一、不足の事態
            起きても当社では一切の責任を負いかねま す。
          </li>
        </ol>
      </div>

      {/* Signature Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          fontSize: "16px",
        }}
      >
        <div>
          <div>金額 (Tổng tiền) {formatNumberV2(bill.total_final)} 円</div>
          <div style={{ marginTop: "20px" }}>
            記入日 (Năm/Tháng/Ngày) {new Date().getFullYear()} 年{" "}
            {new Date().getMonth()} 月 {new Date().getDate()} 日
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div>
            サイン (Ký tên)
            {bill.customer_signature ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src={bill.customer_signature}
                  alt="Chữ ký"
                  style={{
                    width: "200px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
              </div>
            ) : (
              "________________________"
            )}
          </div>
          <div style={{ marginTop: "20px" }}>
            担当者 (NV bán hàng)________________________
          </div>
        </div>
      </div>

      {/* Barcode area (empty) */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {/* Barcode will be added later */}
      </div>
    </div>
  );
});

// Add display name for debugging purposes
MiraiTemplate.displayName = "MiraiTemplate";

export default MiraiTemplate;
