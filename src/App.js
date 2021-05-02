import './styles/App.css';
import { Spline } from 'react-spline';
import SPLINE_EXPORTED_SCENE from './scene.json';
import { Portfolio } from './components/Portfolio';
import { Header } from './components/Header';
import { portfolioData } from './data';

function App() {
    return (
        <div className="App">
            <div>
                <Spline className="art" scene={SPLINE_EXPORTED_SCENE} />
            </div>
            <div className="content">
                <Header />
                <Portfolio data={portfolioData} />
            </div>
        </div>
    );
}



export default App;
