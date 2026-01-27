import React from "react";
import { Calendar } from "lucide-react";

class LunarSolarDatePicker extends React.Component {
  constructor(props) {
    super(props);
    const parsed = this.parseDateString(props.value);
    this.state = {
      showCalendar: false,
      selectedDate: null,
      solarDate: parsed || null,
      lunarDate: parsed
        ? this.solarToLunar(parsed.day, parsed.month, parsed.year)
        : null,
      currentMonth: parsed ? parsed.month - 1 : new Date().getMonth(),
      currentYear: parsed ? parsed.year : new Date().getFullYear(),
    };
  }
  // ========================
  // Parse "dd/mm/yyyy"
  // ========================
  parseDateString(dateStr) {
    if (!dateStr) return null;

    // Chuẩn: yyyy-mm-dd
    const parts = dateStr.split("-");
    if (parts.length !== 3) return null;

    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1]),
      day: parseInt(parts[2]),
    };
  }

  // ========================
  // UPDATE KHI VALUE ĐỔ VÀO THAY ĐỔI (MỞ MODAL SỬA)
  // ========================
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const parsed = this.parseDateString(this.props.value);

      if (parsed) {
        const lunar = this.solarToLunar(parsed.day, parsed.month, parsed.year);

        this.setState({
          solarDate: parsed,
          lunarDate: lunar,
          currentMonth: parsed.month - 1,
          currentYear: parsed.year,
        });
      }
    }
  }

  // Hàm chuyển đổi ngày dương sang âm lịch (thuật toán đơn giản hóa)
  solarToLunar(dd, mm, yy) {
    const PI = Math.PI;

    // Hàm tính Julian Day Number
    const jdFromDate = (dd, mm, yy) => {
      const a = Math.floor((14 - mm) / 12);
      const y = yy + 4800 - a;
      const m = mm + 12 * a - 3;
      let jd =
        dd +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) -
        Math.floor(y / 100) +
        Math.floor(y / 400) -
        32045;
      return jd;
    };

    // Hàm tính new moon (giản lược)
    const getNewMoonDay = (k, timeZone) => {
      const T = k / 1236.85;
      const T2 = T * T;
      const T3 = T2 * T;
      const dr = PI / 180;
      let Jd1 =
        2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
      Jd1 =
        Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
      const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
      const Mpr =
        306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
      const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
      let C1 =
        (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
        0.0021 * Math.sin(2 * dr * M);
      C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
      C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
      C1 =
        C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
      C1 =
        C1 -
        0.0074 * Math.sin(dr * (M - Mpr)) +
        0.0004 * Math.sin(dr * (2 * F + M));
      C1 =
        C1 -
        0.0004 * Math.sin(dr * (2 * F - M)) -
        0.0006 * Math.sin(dr * (2 * F + Mpr));
      C1 =
        C1 +
        0.001 * Math.sin(dr * (2 * F - Mpr)) +
        0.0005 * Math.sin(dr * (2 * Mpr + M));
      const deltat =
        T < -11
          ? 0.001 +
            0.000839 * T +
            0.0002261 * T2 -
            0.00000845 * T3 -
            0.000000081 * T * T3
          : -0.000278 + 0.000265 * T + 0.000262 * T2;
      const JdNew = Jd1 + C1 - deltat;
      return Math.floor(JdNew + 0.5 + timeZone / 24);
    };

    const getSunLongitude = (jdn, timeZone) => {
      const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
      const T2 = T * T;
      const dr = PI / 180;
      const M =
        357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
      const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
      let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
      DL =
        DL +
        (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
        0.00029 * Math.sin(dr * 3 * M);
      let L = L0 + DL;
      L = L * dr;
      L = L - PI * 2 * Math.floor(L / (PI * 2));
      return Math.floor((L / PI) * 6);
    };

    const getLunarMonth11 = (yy, timeZone) => {
      const off = jdFromDate(31, 12, yy) - 2415021;
      const k = Math.floor(off / 29.530588853);
      let nm = getNewMoonDay(k, timeZone);
      const sunLong = getSunLongitude(nm, timeZone);
      if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
      }
      return nm;
    };

    const getLeapMonthOffset = (a11, timeZone) => {
      const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
      let last = 0;
      let i = 1;
      let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
      do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
      } while (arc !== last && i < 14);
      return i - 1;
    };

    // Chuyển đổi chính
    const timeZone = 7;
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);

    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }

    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }

    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    return {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      leap: lunarLeap,
    };
  }

  getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  handleDateSelect = (day) => {
    const solarDate = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      day
    );
    const lunar = this.solarToLunar(
      day,
      this.state.currentMonth + 1,
      this.state.currentYear
    );

    this.setState({
      selectedDate: solarDate,
      solarDate: {
        day: day,
        month: this.state.currentMonth + 1,
        year: this.state.currentYear,
      },
      lunarDate: lunar,
      showCalendar: false,
    });

    // Callback cho parent component
    if (this.props.onChange) {
      this.props.onChange({
        solar: {
          day,
          month: this.state.currentMonth + 1,
          year: this.state.currentYear,
        },
        lunar: lunar,
      });
    }
  };

  changeMonth = (direction, event) => {
    event.preventDefault();
    event.stopPropagation();

    let newMonth = this.state.currentMonth + direction;
    let newYear = this.state.currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    this.setState({ currentMonth: newMonth, currentYear: newYear });
  };

  renderCalendar = () => {
    const daysInMonth = this.getDaysInMonth(
      this.state.currentMonth,
      this.state.currentYear
    );
    const firstDay = this.getFirstDayOfMonth(
      this.state.currentMonth,
      this.state.currentYear
    );
    const days = [];
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    // Thêm ô trống cho các ngày của tháng trước
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: "4px" }}></div>);
    }

    // Thêm các ngày của tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const lunar = this.solarToLunar(
        day,
        this.state.currentMonth + 1,
        this.state.currentYear
      );
      const isSelected =
        this.state.solarDate &&
        this.state.solarDate.day === day &&
        this.state.solarDate.month === this.state.currentMonth + 1 &&
        this.state.solarDate.year === this.state.currentYear;

      days.push(
        <div
          key={day}
          onClick={() => this.handleDateSelect(day)}
          style={{
            padding: "6px 4px",
            cursor: "pointer",
            borderRadius: "6px",
            textAlign: "center",
            transition: "all 0.2s",
            backgroundColor: isSelected ? "#3b82f6" : "transparent",
            color: isSelected ? "white" : "#111827",
            minHeight: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#dbeafe";
          }}
          onMouseLeave={(e) => {
            if (!isSelected)
              e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div
            style={{
              fontWeight: "600",
              fontSize: "15px",
              lineHeight: "1.2",
              marginBottom: "2px",
            }}
          >
            {day}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: isSelected ? "#bfdbfe" : "#dc2626",
              lineHeight: "1.2",
            }}
          >
            {lunar.day}/{lunar.month}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          marginTop: "8px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          border: "1px solid #e5e7eb",
          padding: "20px",
          width: "100%",
          maxWidth: "380px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            onClick={(e) => this.changeMonth(-1, e)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#374151",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f3f4f6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            ‹
          </button>
          <div
            style={{
              fontWeight: "600",
              color: "#1f2937",
              fontSize: "16px",
            }}
          >
            {monthNames[this.state.currentMonth]} {this.state.currentYear}
          </div>
          <button
            type="button"
            onClick={(e) => this.changeMonth(1, e)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "transparent",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#374151",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f3f4f6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            ›
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
            marginBottom: "10px",
          }}
        >
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "600",
                color: "#6b7280",
                padding: "8px 4px",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
          }}
        >
          {days}
        </div>
      </div>
    );
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showCalendar: false });
    }
  };

  render() {
    const displayText = this.state.solarDate
      ? `${this.state.solarDate.day}/${this.state.solarDate.month}/${
          this.state.solarDate.year
        } (Âm lịch: ${this.state.lunarDate.day}/${this.state.lunarDate.month}/${
          this.state.lunarDate.year
        }${this.state.lunarDate.leap ? " nhuận" : ""})`
      : "Chọn ngày";

    return (
      <div
        ref={(node) => (this.wrapperRef = node)}
        style={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <div
          onClick={() => {
            if (this.props.disabled) return;
            this.setState({ showCalendar: !this.state.showCalendar });
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            cursor: this.props.disabled ? "not-allowed" : "pointer",
            backgroundColor: this.props.disabled ? "#f3f4f6" : "white",
            color: this.props.disabled ? "#9ca3af" : "#374151",
            transition: "border-color 0.2s",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            if (!this.props.disabled)
              e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            if (!this.props.disabled)
              e.currentTarget.style.borderColor = "#d1d5db";
          }}
        >
          <Calendar size={20} style={{ color: "#4b5563" }} />
          <span style={{ color: "#374151" }}>{displayText}</span>
        </div>
        {!this.props.disabled &&
          this.state.showCalendar &&
          this.renderCalendar()}{" "}
      </div>
    );
  }
}

// Export component để sử dụng
export default LunarSolarDatePicker;
