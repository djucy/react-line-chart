import LineChart from './LineChart/LineChart';
import LineChart2 from './LineChart2/LineChart2';
// import LineChart3 from './LineChart3/LineChart3';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <LineChart />
      <LineChart2></LineChart2>
      {/* <LineChart3></LineChart3> */}
    </div>
  );
};
