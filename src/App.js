import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [rawData, setRawData] = useState([])
  const [data, setData] = useState()

  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  })


  useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on("response", message => {
      console.log(message)
      setRawData(prevData => [...prevData, message])
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  if (rawData.length > 10) {
    setRawData(prev => prev.filter(x => x !== rawData[0]))
    graf()
  }

  console.log(rawData)



  function graf() {
    setData({
      labels: rawData.map((x) => x.seqId),
      datasets: [
        {
          label: 'Dataset 1',
          data: rawData.map((x) => x.temp),
          borderColor: 'rgb(25, 99, 132)',
          backgroundColor: 'rgba(25, 99, 132, 0.5)'
        },
        {
          label: 'Dataset 2',
          data: rawData.map((x) => x.humidity),
          borderColor: 'rgb(255, 9, 132)',
          backgroundColor: 'rgba(255, 9, 132, 0.5)'
        },
        {
          label: 'Dataset 3',
          data: rawData.map((x) => x.pressure),
          borderColor: 'rgb(255, 99, 12)',
          backgroundColor: 'rgba(255, 99, 12, 0.5)'
        },
        {
          label: 'Dataset 4',
          data: rawData.map((x) => x.gas_resistance),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
      ]

    })

  }








  return (
    <div className="App">
      test
      {data ? <Line options={options} data={data} /> : null};
    </div>
  );
}

export default App;
