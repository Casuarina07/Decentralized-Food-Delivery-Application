import React, { useState } from "react";
import "./Cust.css";
import { Link } from "@reach/router";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

function Home({ reportsIssued, account, addApprovalCount, addRejectionCount }) {
  // const [voted, setVoted] = useState(false);
  console.log("All reports issued: ", reportsIssued);
  return (
    <div style={{ margin: 60, marginTop: 20 }}>
      {reportsIssued.length == 0 ? (
        <h3>No reports filed</h3>
      ) : (
        <div>
          <h3>All reports filed</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Reported by</th>
                <th scope="col">Approval Count</th>
                {/* <th scope="col">Owner</th> */}
                <th scope="col">Rejection Count</th>
                <th scope="col">Status</th>
                <th scope="col">Vote</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {reportsIssued.map((report, key) => {
              let voted = false;
              {
                report.voters.map((voter, key) => {
                  if (voter == account) voted = true;
                });
              }
              if (report.reporter != account)
                return (
                  <>
                    <tbody id="productList">
                      <tr>
                        <td style={{ textOverflow: "ellipsis" }}>
                          {report.reporter}
                        </td>
                        <td>{report.approvalCount}</td>
                        <td>{report.rejectionCount}</td>
                        {report.complete == false ? (
                          <>
                            <td
                              style={{
                                color: "green",
                                fontWeight: "bold",
                              }}
                            >
                              In progress
                            </td>
                          </>
                        ) : (
                          <td style={{ color: "#DC0126", fontWeight: "bold" }}>
                            Completed
                          </td>
                        )}
                        {report.complete == false && voted == false ? (
                          <td>
                            <TiTick
                              size="29"
                              style={{
                                color: "green",
                                marginRight: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => addApprovalCount(report.id)}
                            />
                            <ImCross
                              size="17"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => addRejectionCount(report.id)}
                            />
                          </td>
                        ) : (
                          <td>Voted</td>
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
                              padding: 6,
                              cursor: "pointer",
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

export default Home;
