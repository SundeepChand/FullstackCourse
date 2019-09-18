import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header2 = ({ title }) => <h2>{title}</h2>


const Button = ({ onClick, title }) => <button onClick={onClick}>{title}</button>


const Statistic = ({ text, data }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{data}</td>
        </tr>
    )
}


const Statistics = ({ data }) => {
    if (data.total === 0) {
        return (<p>No feedback given</p>)
    }
    return (
    <div>
        <table border="0" cellPadding="5px">
            <Statistic text={"Good"} data={data.good} />
            <Statistic text={"Neutral"} data={data.neutral} />
            <Statistic text={"Bad"} data={data.bad} />
            <Statistic text={"Total"} data={data.total} />
            <Statistic text={"Average"} data={data.average} />
            <Statistic text={"Positive"} data={data.positivePer} />
        </table>
    </div>
    )
}


const App = () => {

    const [data, setData] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    })
    data.total = data.good + data.neutral + data.bad     // Set the total value
    data.average = 0
    data.positivePer = 0
    // Calculate average & postive % if total != 0
    if (data.total !== 0) {
        data.average = (data.good - data.bad) / data.total
        data.positivePer =  (data.good * 100) / data.total
    }

    // Event handlers
    const handleGood = () => setData({...data, good: data.good + 1})

    const handleNeutral = () => setData({...data, neutral: data.neutral + 1})

    const handleBad = () => setData({...data, bad: data.bad + 1})
    
    return (
        <div>
            <Header2 title={"Give feedback"} />
            <br />
            <Button onClick={handleGood} title={"Good"} />
            <Button onClick={handleNeutral} title={"Neutral"} />
            <Button onClick={handleBad} title={"Bad"} />
            <div>
                <Header2 title={"Statistics"} />
                <Statistics data={data} />         
            </div>   
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
