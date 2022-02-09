import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import './assets/styles.css'

import { FaIdCard } from 'react-icons/fa';

const Footer = () => (
  <Container className="footer bg-dark">
    <Col xs={12}>
      <Container>
        <Row center="xs" className="justify-content-around">
          <Col xs={4} lg={2} className="contactInfo text-center">
            <div className="contactInfo-box justify-content-between mt-3">
              <a href="https://github.com/dcrlsn" target='_blank' rel="noreferrer" className="text-muted">
                <FaIdCard size={20} />
              </a>
              <p className="text-light">dan</p>
            </div>
          </Col>
          <Col xs={4} lg={2} className="contactInfo text-center">
            <div className="contactInfo-box justify-content-between mt-3">
              <a href="https://github.com/gluupo" target='_blank' rel="noreferrer" className="text-muted">
                <FaIdCard size={20} />
              </a>
              <p className="text-light">ari</p>
            </div>
          </Col>
          <Col xs={4} lg={2} className="contactInfo text-center">
            <div className="contactInfo-box justify-content-between mt-3">
              <a href="https://github.com/bigzeus2005" target='_blank' rel="noreferrer" className="text-muted">
                <FaIdCard size={20} />
              </a>
              <p className="text-light">jesus</p>
            </div>
          </Col>
          <Col xs={4} lg={2} className="contactInfo text-center">
            <div className="contactInfo-box justify-content-between mt-3">
              <a href="https://github.com/Johny49" target='_blank' rel="noreferrer" className="text-muted">
                <FaIdCard size={20} />
              </a>
              <p className="text-light">geoff</p>
            </div>
          </Col>
          <Col xs={4} lg={2} className="contactInfo text-center">
            <div className="contactInfo-box justify-content-between mt-3">
              <a href="https://github.com/Ybyonas1" target='_blank' rel="noreferrer" className="text-muted">
                <FaIdCard size={20} />
              </a>
              <p className="text-light">yonas</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  </Container>
);

export default Footer;
