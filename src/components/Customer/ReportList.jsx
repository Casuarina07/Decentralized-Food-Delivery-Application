import React, { useState } from "react";
import "./Cust.css";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Link } from "@reach/router";

export default function ReportList(props) {
  const reports = props.location.state.reports;
  console.log(reports);

  return (
    <div style={{ margin: 60, marginTop: 20 }}>
      {reports.length == 0 ? (
        <h3>No reports filed by you</h3>
      ) : (
        <div>
          <h3>Reports filed by you</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Reported by</th>
                <th scope="col">Approval Count</th>
                {/* <th scope="col">Owner</th> */}
                <th scope="col">Rejection Count</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {reports.map((report, key) => {
              let complete = false;
              let reportDate = new Date(report.deadlineDate * 1000);
              if (new Date() > reportDate) {
                complete = true;
              }
              return (
                <>
                  <tbody id="productList">
                    <tr>
                      <td style={{ textOverflow: "ellipsis" }}>
                        {report.owner}
                      </td>
                      <td>{report.approvalCount}</td>
                      <td>{report.rejectionCount}</td>
                      {complete == false ? (
                        <td
                          style={{
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          Pending
                        </td>
                      ) : (
                        <td style={{ color: "#DC0126", fontWeight: "bold" }}>
                          Completed
                        </td>
                      )}

                      {/* <td>
                    <Button
                      //   style={{ backgroundColor: "#0072F5" }}
                      style={{ backgroundColor: "#226BBF" }}
                      //   onClick={(event) => {
                      //     // this.props.removeProdCart(this.props.custId, cart);
                      //   }}
                      //   onClick={routeChange(report.id)}
                    >
                      Details
                    </Button>
                  </td> */}
                      <td>
                        <h5
                          style={{
                            backgroundColor: "#226BBF",
                            borderRadius: 4,
                            padding: 4,
                          }}
                        >
                          <Link
                            style={{
                              color: "#FFF",
                              fontSize: 18,
                              textDecoration: "none",
                            }}
                            to={`/reportDetails/${report.id}`}
                            state={{ report: report }}
                          >
                            Details
                          </Link>
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
}
