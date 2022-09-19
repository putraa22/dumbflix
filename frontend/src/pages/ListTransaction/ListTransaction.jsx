import { Container, Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import './ListTransaction.scss'

function ListTransaction() {

    let { data: transaction } = useQuery('ChaceAdmin', async () => {
        const response = await API.get("/transactions");
        // console.log(response);
        return response.data.data
    })



  return (
    <div className='app__list-transaction' >
    <Container>
        <p className='h5 text-light fw-bold' style={{marginTop: '50px'}}>
            Incoming Transaction
        </p><br/>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr style={{color: 'red'}}>
          <th>No</th>
          <th>Users</th>
          <th>Bukti Transfer</th>
          <th>Remaining Active</th>
          <th>Status User</th>
          <th>Status Payment</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {transaction?.map((item, index) => (

        <tr key={index}>
            <td>{item.user.id}</td>
            <td>{item.user.fullname}</td>
            <td>{item.attache}</td>
            <td>26/Hari</td>
            <td>Active</td>
            <td>Approve</td>
            {/* <td>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{backgroundColor: 'black'}}>
                        <Dropdown.Item style={{color: 'green'}} href="#/action-1">Approved</Dropdown.Item>
                        <Dropdown.Item style={{color: 'red'}} href="#/action-2">Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td> */}
        </tr>
        ))}
      </tbody>
    </Table>
    </Container>
    </div>
  );
}

export default ListTransaction;