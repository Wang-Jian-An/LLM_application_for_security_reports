import './Popular.css';
import React from 'react';
import { useState } from 'react';

function MyForm() {

    const [inputValue, setInputValue] = useState('趨勢科技');
    const [apiResponse, setApiResponse] = useState(null);

    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

    const handleSearch = async () => {
    const url = 'http://localhost:5005/popular_science/key_words'; // 替换为你的API URL

    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key_words: inputValue }),
        });

        if (!response.ok) {
        throw new Error('Failed to send message');
        }

        const data = await response.json();
        setApiResponse(data['basic']); // 假设 API 返回的数据格式为 { response: '...' }
    } catch (error) {
        console.error('Error:', error);
    }
    };
    
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
      <div className="new-update" style={{ height: '800px', width: '1000px' }} >
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                近期新知 <button className="btn btn-secondary" type="reset">近期新知搜索</button>
                </label>
                <hr></hr>
                <label>
                進階搜索 <input
                    name="myInput"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                </label>


                <hr />
                <div className='button-list'>
                    <button className="btn btn-secondary" type="reset">Reset form</button>
                    <button onClick={handleSearch} className="btn btn-secondary" type="submit">Submit form</button>
                </div>
                {apiResponse && (
                    <div>
                    <h3>Search Results:</h3>
                    <p>{apiResponse}</p>
                    </div>
                )}
            </form>
        </div>
 
      </div>
      
    );
  }


function PopularComponent() {

    return (
        <div>
            <MyForm />
        </div>
    );
}

export default PopularComponent;