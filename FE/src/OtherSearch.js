import './Popular.css';
import './OtherSearch.css';
import data from "./example/example1.json";

import {
  Sigma,
  RandomizeNodePositions,
  RelativeSize,
  NOverlap
} from "react-sigma";
import ForceLink from "react-sigma/lib/ForceLink";

data.edges.forEach((edge) => {
    edge.id = Math.random();
  });
function MyForm() {
    function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
  
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
      // You can pass formData as a fetch body directly:
      fetch('/some-api', { method: form.method, body: formData });
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }
  
    return (
      <div className="new-update">
        <form method="post" onSubmit={handleSubmit}>
            <label>
            關鍵詞搜索 <input name="myInput" defaultValue="趨勢科技" />
            </label>
            <hr />
            <div className='button-list'>
                <button className="btn btn-secondary" type="reset">Reset form</button>
                <button className="btn btn-secondary" type="submit">Submit form</button>
            </div>
        </form>
      </div>
    );
  }
  

function SearchComponent() {

    return (
        <div >
            <div className='graph-container'>
                <MyForm />
            </div>
            <br></br>
            <div style={{ height: '600px', width: '800px' }}>

                <Sigma
                    graph={data}
                    settings={{
                    animationsTime: 3000,
                    defaultLabelSize: 15,
                    drawLabels: true,
                    labelSize: "fixed",
                    labelThreshold: 5
                    }}
                    style={{
                    height: "600px",
                    width: "800px",
                    maxWidth: "inherit",
                    backgroundColor: "lightgray"
                    }}
                >
                    <RandomizeNodePositions>
                    <ForceLink
                        background
                        easing="cubicInOut"
                        iterationsPerRender={1}
                        linLogMode
                        timeout={1000}
                        worker
                        outboundAttractionDistribution={false}
                    />
    
                    <NOverlap
                        duration={3000}
                        easing="quadraticInOut"
                        gridSize={20}
                        maxIterations={100}
                        nodeMargin={10}
                        scaleNodes={4}
                        speed={10}
                    />
                    <RelativeSize initialSize={5} />
                    </RandomizeNodePositions>
                </Sigma>
            </div>
        </div>
    );
}

export default SearchComponent;