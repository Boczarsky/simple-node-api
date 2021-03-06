# Simple Node.js REST API

<h1>How to run</h1>
<p>First open terminal in main directory and type "npm install".</p>
<p>When process finished type in terminal "npm start" and server should start on localhost:3000</p>

<h1>Endpoints</h1>
<ul>
  <li>
    <h2>/login</h2>
    <h3>POST</h3>
    <p>For authenticate user (admin/Admin1 hardcoded)</p>
    <h4>Request</h4>
    <pre><code>{
    username: string,
    password: string
}</code></pre>
    <h4>Response</h4>
    <pre><code>{
    token: string
}</code></pre>
  </li>
  <li>
    <h2>/register</h2>
    <h3>POST</h3>
    <p>For register new user</p>
    <h4>Request</h4>
    <pre><code>{
    username: string,
    password: string
}</code></pre>
  </li>
  <li>
    <h2>/articles</h2>
    <h3>GET</h3>
    <p>Fetch for array of articles</p>
    <h4>Response</h4>
    <pre><code>[{
    id: number,
    header: string,
    content: string
}]</code></pre>
    <h3>POST</h3>
    <p>Add new article</p>
    <h4>Request</h4>
    <pre><code>{
    id: number,
    header: string,
    content: string
}</code></pre>
  </li>
    <li>
    <h2>/articles/:id</h2>
    <h3>GET</h3>
    <p>Fetch single specific article by id</p>
    <h4>Response</h4>
    <pre><code>{
    id: number,
    header: string,
    content: string
}</code></pre>
    <h3>DELETE</h3>
    <p>Delete single specific article by id</p>
  </li>
    <li>
    <h2>/gallery</h2>
    <h3>GET</h3>
    <p>Fetch for array of images</p>
    <h4>Response</h4>
    <pre><code>[{
    id: number,
    title: string,
    url: string
}]</code></pre>
    <h3>POST</h3>
    <p>Add new image</p>
    <h4>Request</h4>
    <pre><code>{
    id: number,
    title: string,
    url: string
}</code></pre>
  </li>
    <li>
    <h2>/gallery/:id</h2>
    <h3>GET</h3>
    <p>Fetch single specific image by id</p>
    <h4>Response</h4>
    <pre><code>{
    id: number,
    title: string,
    url: string
}</code></pre>
    <h3>DELETE</h3>
    <p>Delete single specific image by id</p>
  </li>
  <li>
    <h2>/storage?wipe=(options)</h2>
    <h3>POST</h3>
    <p>Use for wipe whole data or just part</p>
    <h4>Options:</h4>
    <ul>
      <li>all - for wipe all data</li>
      <li>gallery - for wipe only gallery data</li>
      <li>articles - for wipe only articles data</li>
      <li>users - for wipe only users data</li>
    </ul>
</ul>
