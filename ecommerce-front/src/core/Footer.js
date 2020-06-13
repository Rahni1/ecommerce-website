import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'
import { getCategories} from "./apiCore";
import { Icon } from 'semantic-ui-react'

const Footer = () => {
    const [data, setData] = useState({
        categories: [],
        category: ""
      });

      const { categories, category } = data;

      const loadCategories = () => {
        getCategories().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setData({ ...data, categories: data });
          }
        });
      };
      useEffect(() => {
        loadCategories();
      }, []);

        return (
            <footer id="footer">
            <div className="hrow row">
            <div className="col-sm-5 follow">
            <h5>Follow Us:<span className="twitter-icon"><a href="https://twitter.com/planetrescueapp"><Icon name='twitter' size='large'/></a></span></h5>
            </div>
            <div className="col-sm-7">
            <div className="links">
            <div className="col">
            <h5>Shop</h5>
            <ul>
            <li>
            {categories.map((c, i) => (
                <Link to={``} className="c-link" key={i} value={c._id}>
                  {c.name}
                </Link>
              ))}
              </li>
            </ul>
            </div>

            <div className="col">
            <h5>Help</h5>
            <ul>
            <li><Link className="link">FAQs & Contact</Link></li>
            <li><Link className="link">Shipping & Returns</Link></li>
            </ul>
            <ul className="contact">
            <li>
            <strong>T.&nbsp;</strong>
            +44 (0) 688 456 7856
            </li>
            </ul>
            </div>
            </div>
            </div>
            </div>
            <hr className="hr"/>
          <small>&copy; {(new Date().getFullYear())} Planet Rescue. All rights reserved.</small>
        
        
            </footer>
        )
}

export default Footer