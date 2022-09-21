import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import "./ListTransaction.scss";

function ListTransaction() {
  let { data: transaction } = useQuery("ChaceAdmin", async () => {
    const response = await API.get("/transactions");
    // console.log(response);
    return response.data.data;
  });

  function Duration(dueDate, startDate) {
    const due = new Date(dueDate);
    startDate = new Date();

    let duration;

    if (startDate < due) {
      duration = new Date(due - startDate);
    }

    let years = duration.getFullYear() - 1970;
    let months = duration.getMonth();
    let days = duration.getDate();

    let yearTxt = "year";
    let monthTxt = "month";
    let dayTxt = "day";

    if (years > 1) yearTxt += "s";
    if (months > 1) monthTxt += "s";
    if (days > 1) dayTxt += "s";

    if (years >= 1) {
      duration = `${years} ${yearTxt} ${months} ${monthTxt} ${days} ${dayTxt}`;
    } else if (months >= 1) {
      duration = `${months} ${monthTxt} ${days} ${dayTxt}`;
    } else {
      duration = `${days} ${dayTxt}`;
    }
    return duration;
  }
  return (
    <div className="app__list-transaction">
      <Container>
        <p className="h5 text-light fw-bold" style={{ marginTop: "50px" }}>
          Incoming Transaction
        </p>
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ color: "red" }}>
              <th>No</th>
              <th>Users</th>
              {/* <th>Bukti Transfer</th> */}
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
                {/* <td>{item.attache}</td> */}
                <td>{Duration(item.dueDate, item.startDate)}</td>
                <td className={item.status === "success" ? "text-success" : "text-danger"}>{item.status === "success" ? "Active" : "Not Active"}</td>
                <td className={item.status === "success" ? "text-success" : item.status === "pending" ? "text-warning" : "text-danger"}>{item.status === "success" ? "Success" : item.status === "pending" ? "Pending" : "Failed"}</td>
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
