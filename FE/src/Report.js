import React from 'react';
import './home.css';
import './Report.css'
import { Link } from 'react-router-dom';
import Custom_table from './Table';
import { PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, Label, YAxis, Bar, LabelList, Legend, Tooltip } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePDF, Resolution, Margin } from 'react-to-pdf';

const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A'
];


const options = {
   method: 'open',
   resolution: Resolution.HIGH,
   page: {
      margin: Margin.MEDIUM, // Adjust margin size
      format: 'A4', // Change page format
      orientation: 'landscape', // Or try 'portrait'
   },
};


function ShowReport(props) {

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const { pred_data } = props;

    const pred_threshold = JSON.parse(pred_data[0].data);
    const pos = Object.values(pred_threshold.pred_threshold).reduce((acc, val) => acc + val, 0);
    const neg = 10 - pos;
    console.log(pred_threshold)
    const data = [
      {
        "name": "drug resistance: positive",
        "value": pos
      },
      {
        "name": "drug resistance: negative",
        "value": neg
      }]

    const data2 = [

        {
          "name": "Chloramphenicol",
          "predicted MIC": pred_threshold.pred["Chloramphenicol_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Chloramphenicol
        },
        {
          "name": "Ciprofloxacin",
          "predicted MIC": pred_threshold.pred["Ciprofloxacin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Ciprofloxacin
        },
        {
          "name": "Colistin",
          "predicted MIC": pred_threshold.pred["Colistin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Colistin
        },
        {
          "name": "Gentamicin",
          "predicted MIC": pred_threshold.pred["Gentamicin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Gentamicin
        },
        {
          "name": "Nalidixic Acid",
          "predicted MIC": pred_threshold.pred["Nalidixic Acid_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold['Nalidixic Acid']
        }
      
      ]

      const data3 = [
        {
          "name": "Chloramphenicol",
          "predicted MIC": pred_threshold.pred["Chloramphenicol_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Chloramphenicol
        },
        {
          "name": "Ciprofloxacin",
          "predicted MIC": pred_threshold.pred["Ciprofloxacin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Ciprofloxacin
        },
        {
          "name": "Colistin",
          "predicted MIC": pred_threshold.pred["Colistin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Colistin
        },
        {
          "name": "Gentamicin",
          "predicted MIC": pred_threshold.pred["Gentamicin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Gentamicin
        },
        {
          "name": "Nalidixic Acid",
          "predicted MIC": pred_threshold.pred["Nalidixic Acid_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold['Nalidixic Acid']
        }
      
      ]
    
    const data4 = [
        {
          "name": "Chloramphenicol",
          "training_data": "in-house data",
          "predicted MIC": pred_threshold.pred["Chloramphenicol_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Chloramphenicol,
          "drug resistance positive": pred_threshold.pred_threshold["Chloramphenicol_pkl321_model"]
        },
        {
          "name": "Ciprofloxacin",
          "training_data": "in-house data",
          "predicted MIC": pred_threshold.pred["Ciprofloxacin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Ciprofloxacin,
          "drug resistance positive": pred_threshold.pred_threshold["Ciprofloxacin_pkl321_model"]
        },
        {
          "name": "Colistin",
          "training_data": "in-house data",
          "predicted MIC": pred_threshold.pred["Colistin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Colistin,
          "drug resistance positive": pred_threshold.pred_threshold["Colistin_pkl321_model"]
        },
        {
          "name": "Gentamicin",
          "training_data": "in-house data",
          "predicted MIC": pred_threshold.pred["Gentamicin_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold.Gentamicin,
          "drug resistance positive": pred_threshold.pred_threshold["Gentamicin_pkl321_model"]
        },
        {
          "name": "Nalidixic Acid",
          "training_data": "in-house data",
          "predicted MIC": pred_threshold.pred["Nalidixic Acid_pkl321_model"],
          "drug resistance threshold": pred_threshold.threshold['Nalidixic Acid'],
          "drug resistance positive": pred_threshold.pred_threshold["Nalidixic Acid_pkl321_model"]
        },
        {
          "name": "Chloramphenicol",
          "training_data": "BV-BRC data",
          "predicted MIC": pred_threshold.pred["Chloramphenicol_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Chloramphenicol,
          "drug resistance positive": pred_threshold.pred_threshold["Chloramphenicol_inter1000_model"]
        },
        {
          "name": "Ciprofloxacin",
          "training_data": "BV-BRC data",
          "predicted MIC": pred_threshold.pred["Ciprofloxacin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Ciprofloxacin,
          "drug resistance positive": pred_threshold.pred_threshold["Ciprofloxacin_inter1000_model"]
        },
        {
          "name": "Colistin",
          "training_data": "BV-BRC data",
          "predicted MIC": pred_threshold.pred["Colistin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Colistin,
          "drug resistance positive": pred_threshold.pred_threshold["Colistin_inter1000_model"]
        },
        {
          "name": "Gentamicin",
          "training_data": "BV-BRC data",
          "predicted MIC": pred_threshold.pred["Gentamicin_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold.Gentamicin,
          "drug resistance positive": pred_threshold.pred_threshold["Gentamicin_inter1000_model"]
        },
        {
          "name": "Nalidixic Acid",
          "training_data": "BV-BRC data",
          "predicted MIC": pred_threshold.pred["Nalidixic Acid_inter1000_model"],
          "drug resistance threshold": pred_threshold.threshold['Nalidixic Acid'],
          "drug resistance positive": pred_threshold.pred_threshold["Nalidixic Acid_inter1000_model"]
        }
      
    ]

    return (
       <div>
          <header className="App-header">
            <Link to="/">
              <button className="home">
                  <i className="fa fa-home"></i> &gt; 沙門氏菌抗藥性之人工智慧預測平台
              </button>
            </Link>
            <div className="title">
              <h1>
                沙門氏菌抗藥性之人工智慧預測平台
              </h1>
            </div>
            <div className='objective-1'>
              <p>
                本系統使用研究團隊開發的人工智慧演算法識別24種藥物，使用相關k-mer序列進行分析，提供針對抗藥性特性之抗藥性分析。
              </p>
            </div>
            <br />
          </header>

          <section className='App-content'>
                <div className='outer-2'>
                    <div className='pdfbutton'>
                      <button className="btn btn-success" onClick={() => toPDF(options)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"></path>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"></path>
                        </svg>
                        Download PDF</button>
                    </div>
                
                    <div className='outer' ref={targetRef}>
                        <div className='ReportName'>
                          <h2>Results Analysis Report</h2>
                        </div>
                        <div>
                          <h5>Uploaded File Name: {pred_data[1]}</h5>
                        </div>
                        <div>
                          <PieChart width={550} height={550}>
                           <Legend align="center" />
                           <Tooltip />
                            <Pie data={data} cx="50%" cy="50%" outerRadius={200} label >
                              {
                                data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index]} style={{
                                    fontSize: '3rem',
                                    fontFamily: 'Times New Roman',
                                }}/>
                                  
                                ))
                              }
              
                            </Pie>
                          </PieChart>
                        </div>
                        <div>
                          <BarChart
                            width={730}
                            height={250}
                            data={data2}
                            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                              <Label value="In-house Data based Models" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'MIC', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                            <Legend align="right"/>
                            <Tooltip />
                            <Bar dataKey="drug resistance threshold" fill="#8884d8">
                              <LabelList dataKey="drug resistance threshold" position="top" />
                            </Bar>
                            <Bar dataKey="predicted MIC" fill="#82ca9d">
                              <LabelList dataKey="predicted MIC" position="top" />
                            </Bar>
                          </BarChart>
                        </div>
                        <div>
                          <BarChart
                            width={730}
                            height={250}
                            data={data3}
                            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                              <Label value="BV-BRC DataBase based Models" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'MIC', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
                            <Legend align="right"/>
                            <Tooltip />
                            <Bar dataKey="drug resistance threshold" fill={colors[0]}>
                              <LabelList dataKey="drug resistance threshold" position="top"  />
                            </Bar>
                            <Bar dataKey="predicted MIC" fill={colors[5]}>
                              <LabelList dataKey="predicted MIC" position="top" />
                            </Bar>
                          </BarChart>
                        </div>
                        <div>
                          <Custom_table Data={data4}/>
                        </div>
                        <br />
                    </div>
                </div>
          </section>
          <nav className="navbar navbar-light">
          <span>
            Copyright (c) 2024 Chun-Wei Tung. All rights reserved.
          </span>
        </nav>
        </div>
    );
};


export default ShowReport;

