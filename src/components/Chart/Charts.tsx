import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    Tooltip,
    XAxis
} from "recharts";
import './chart.style.scss'
import useData from "../../hooks/useData.ts";


function Charts() {
    const data = useData()
    if (!data) {
        return null;
    }

    const dimention = {
        width: 1200,
        height: 600
    }
    return (
        <div className="wrapper">
            <LineChart {...dimention} data={data}>
                <XAxis dataKey="postId"/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Line type="monotone" dataKey="comments" stroke="#ff7300" yAxisId={0}/>
                <Tooltip/>
            </LineChart>

            <PieChart {...dimention}>
                <Pie data={data} dataKey="comments" cx="50%" cy="50%" innerRadius={30} outerRadius={200}
                     fill="#86ca9d" label/>
                <Tooltip/>
            </PieChart>

            <RadarChart outerRadius={200} {...dimention} data={data}>
                <PolarGrid/>
                <PolarRadiusAxis angle={90} domain={[0, 100]}/>
                <Radar dataKey="comments" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <Legend/>
                <Tooltip/>
            </RadarChart>
        </div>
    );
}

export default Charts;

