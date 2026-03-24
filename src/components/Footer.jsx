import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Column 1 */}
        <div style={styles.column}>
          <h3>About Us</h3>
          <p>
            We are passionate about transforming everyday living through innovative 
            smart home technology. Our goal is to make homes safer, more efficient, 
            and more connected.
          </p>
        </div>

        {/* Column 2 (Form) */}
        <div style={styles.column}>
          <h3>Contact Us</h3>
          <form>
            <input
              type="text"
              placeholder="Your Name"
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={styles.input}
            />
            <textarea
              placeholder="Your Message"
              style={styles.textarea}
            />
            <button type="submit" style={styles.button}>
              Send
            </button>
          </form>
        </div>

        {/* Column 3 (Social Links) */}
        <div style={styles.column}>
          <h3>Follow Us</h3>
          <div style={styles.socials}>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#222",
    color: "#fff",
    padding: "40px 20px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },
  column: {
    flex: "1",
    minWidth: "250px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "none",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    height: "80px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "none",
  },
  button: {
    padding: "10px",
    background: "#00bcd4",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
  socials: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
};

export default Footer;