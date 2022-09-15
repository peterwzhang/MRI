import React from 'react';
import styled from 'styled-components';

const JobTable = () => (
    <div>
        <h1>
            Current Jobs
        </h1>
        <TableWrapper>
            <table>
              <tbody>
                <tr>
                    <th>Job ID</th>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
                <tr>
                    <td>123</td>
                    <td>Peter knee</td>
                    <td>8:00</td>
                </tr>
                <tr>
                    <td>456</td>
                    <td>Madeline brain</td>
                    <td>1:00</td>
                </tr>
              </tbody>
            </table>
        </TableWrapper>
    </div>
);

const TableWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      padding: .5rem 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export default JobTable;