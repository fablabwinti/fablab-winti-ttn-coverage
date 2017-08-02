
import React, { Component } from 'react';
import { Map } from './map'

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid row">
          <div className="col-lg-8">
            <Map />
          </div>
          <div className="col-lg-4">
           <table className="table table-sm table-striped">
             <colgroup>
              <col style={{width: '40%'}} />
              <col style={{width: '60%'}} />
             </colgroup>
            <tbody>
              <tr>
                <th scope="row">deviceId</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">time</th>
                <td>Jacob</td>
              </tr>
              <tr>
                <th scope="row">frequency</th>
                <td>Larry</td>
              </tr>
              <tr>
                <th scope="row">modulation</th>
                <td>Larry</td>
              </tr>
              <tr>
                <th scope="row">data_rate</th>
                <td>Larry</td>
              </tr>
              <tr>
                <th scope="row">bit_rate</th>
                <td>Larry</td>
              </tr>
              <tr>
                <th scope="row">coding_rate</th>
                <td>Larry</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}

