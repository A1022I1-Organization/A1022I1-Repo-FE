import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as service from "../../services/medical_supplies/MedicalSupplyService";
import { mergeData } from "./mergeData";

export function StatisticsMaterial() {
  const [data, setData] = useState([]);
  const [convertedData, setConvertedData] = useState([]);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const chartRef = useRef();

  useEffect(() => {
    fetchData();
  }, [firstDate, lastDate]);

  useEffect(() => {
    myChart();
  }, [convertedData]);

  const fetchData = async () => {
    const tokenAccount = localStorage.getItem("tokenAccount");

    const result = await service.findAllBetweenDays(lastDate, tokenAccount);
    console.log(result);
    setData(result);
  };

  const convetedNewData = () => {
    setConvertedData(mergeData(data, firstDate));
  };

  const myChart = () => {
    if (!chartRef.current || convertedData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");

    const labels = convertedData.map((item) => item.name);
    const importData = convertedData.map((item) => item.importQuantity);
    const soldData = convertedData.map((item) => item.soldQuantity);
    const storageData = convertedData.map((item) => item.storageQuantity);
    const brokenData = convertedData.map((item) => item.brokenQuantity);

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    chartRef.current.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Vật tư nhập vào",
            data: importData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Vật tư bán được",
            data: soldData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Vật tư tồn kho",
            data: storageData,
            backgroundColor: "rgba(255, 205, 86, 0.2)",
            borderColor: "rgba(255, 205, 86, 1)",
            borderWidth: 1,
          },
          {
            label: "Vật tư hư hỏng - hết hạn",
            data: brokenData,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: options,
    });
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center" }}>Thống Kê - Báo Cáo</h1>
      <div className="d-flex justify-content-between">
        <div />
        <div />
        <div />
        <div>
          Từ ngày: &nbsp;
          <input
            type="date"
            name="beginDate"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
          />
        </div>
        <div>
          Đến ngày: &nbsp;
          <input
            type="date"
            name="endDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
        </div>
        {lastDate != "" && firstDate != "" ? (
          <button
            type="button"
            onClick={() => convetedNewData()}
            className="btn btn-primary"
          >
            Button
          </button>
        ) : (
          <button type="button" className="btn btn-secondary">
            Button
          </button>
        )}
      </div>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">Mã VT</th>
            <th scope="col">Tên vật tư</th>
            <th scope="col">Vật tư nhập vào</th>
            <th scope="col">Vật tư bán được</th>
            <th scope="col">Vật tư tồn kho</th>
            <th scope="col">Vật tư hư hỏng - hết hạn</th>
          </tr>
        </thead>
        <tbody>
          {data == null ? (
            <tr>
              <td colSpan="6">Không có dữ liệu</td>
            </tr>
          ) : (
            convertedData.map((item, key) => (
              <tr key={key}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.importQuantity}</td>
                <td>{item.soldQuantity}</td>
                <td>{item.storageQuantity}</td>
                <td>{item.brokenQuantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button id="button" className="btn btn-light">
          <i className="bi bi-eye" />
          Xem
        </button>
        <button id="button" className="btn btn-light">
          <i className="bi bi-printer" />
          In
        </button>
        <button id="button" className="btn btn-light">
          <i className="bi bi-arrow-left" />
          Trở về
        </button>
      </div>
      <div className="chart-container">
        <div className="chart">
          <canvas ref={chartRef} width={400} height={200} />
        </div>
      </div>
    </div>
  );
}
