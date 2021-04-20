class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <style>
          footer {
            height: 60px;
            padding: 0 10px;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #dfdfe2;
          }
          
          ul li {
            list-style: none;
            display: inline;
          }
          
          a {
            margin: 0 15px;
            color: inherit;
            text-decoration: none;
          }
          
          a:hover {
            padding-bottom: 5px;
            box-shadow: inset 0 -2px 0 0 #333;
          }
          
          .social-row {
            font-size: 20px;
          }
          
          .social-row li a {
            margin: 0 15px;
          }
        </style>
        <footer>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="work.html">Work</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <ul class="social-row">
            <li><a href="https://github.com/my-github-profile"><i class="fab fa-github"></i></a></li>
            <li><a href="https://twitter.com/my-twitter-profile"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com/in/my-linkedin-profile"><i class="fab fa-linkedin"></i></a></li>
          </ul>
        </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);
  
