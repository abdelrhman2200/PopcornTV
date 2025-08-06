import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={instagram_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={facebook_icon} alt="" />
        <img src={youtube_icon} alt="" />
      </div>
      <ul>
        <li>Auto Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notice</li>
        <li>Cookie Preference</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyrights-text'>© 2020 PopcornTV, Inc.</p>

    </div>
  )
}

export default Footer