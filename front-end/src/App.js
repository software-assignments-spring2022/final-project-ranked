import './App.css';

function App() {
  return (
    <div className="App">
      <div class="header">
        <h2>This is the header.</h2>  
      </div>


  <div class="leftcolumn">
    <div class="post">
      <h2>Post 1</h2>
      <h5>Author: Sid,Last Updated: Dec 7, 2021</h5>
      <div class="img"><img src = "N/A" alt="N/A"/></div>
      <p>Trying to farm</p>
      <p>No one can stop me farming.</p>
    </div>
    <div class="post">
      <h2>Post 2</h2>
      <h5>Author: Sid,Last Updated: Dec 9, 2021</h5>
      <div class="img"><img src = "N/A" alt="N/A"/></div>
      <p>Best Valorants players in the world:</p>
      <ul>
          <li>Sid</li>
          <li>Tenz</li>
          <li>ShahZaM</li>
      </ul>
    </div>
    <div class="post">
        <h2>Post 3</h2>
        <h5>Author: Sid,Last Updated: Dec 10, 2021</h5>
        <div class="img"><img src = "N/A" alt="N/A"/></div>
        <p>Best LOL players in the world::</p>
        <ul>
          <li>Sid</li>
          <li>Faker</li>
      </ul>
    </div>
    <div class="post">
        <h2>Post 4</h2>
        <h5>Author: Sid,Last Updated: Dec 10, 2021</h5>
        <div class="img"><img src = "Hash.svg" alt="Hash"/></div>
        <p>I hate midterm.</p>
    </div>
  </div>

  <div class="footer">
    <h2>This is the footer.</h2>
    </div>
</div>
  );
}

export default App;
