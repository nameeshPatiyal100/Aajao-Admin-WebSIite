import {
  AdmindPieChart,
  // AdminGaugeChart,
  AdminLatestBookings,
  AdminLatestTransactions,
  AdminRadarChart,
} from "../../../components";
import DashboardHeading from "./DashboardHeading";

import { AdminBarChart, AdminLineChart, AdminTable } from "../../../components";
import "./dashboard.css";
// import addressPng from "../../../assets/admin/address.png";
const Dashboard = () => {
  return (
    <>
      <div className="dashboardApexContainer">
        <h4 className="firstHeading">Welcome Back 🤟🏻</h4>
        <h2 className="secondHeading">Glad to see you</h2>
        <section className="dashboardSectionContainer">
          <div className="dashboardSectioncontainerOne">
            <h2 className="">125,666</h2>
            <h5 className="">Total Number of User</h5>
          </div>
          <div className="dashboardSectionContainerTwo">
            <h2 className="">125,666</h2>
            <h5 className="">Total Number of Host</h5>
          </div>
          <div className="dashboardSectionContainerThree">
            <h2 className="">125,666</h2>
            <h5 className="">Total Number of Properties</h5>
          </div>
          <div className="dashboardSectionContainerFour">
            <h2 className="">125,666</h2>
            <h5 className="">Total Trasactions</h5>
          </div>
        </section>
      </div>

      <section className="motivationSection">
        <div className="motivationContent">
          <div className="motivationStats">
            <div className="statBox">
              <h4 className="statBoxTitle">Pending User</h4>
              <p className="statBoxValue">12</p>
            </div>
            <div className="statBox">
              <h4 className="statBoxTitle">Pending Hosts</h4>
              <p className="statBoxValue">8</p>
            </div>
            <div className="statBox">
              <h4 className="statBoxTitle">Pending Hosts</h4>
              <p className="statBoxValue">8</p>
            </div>
          </div>
          <div className="motivationText">
            <h3 className="motivationQuote">
              "The only way to do great work is to love what you do"
            </h3>
            <p className="motivationAuthor">— Steve Jobs</p>
          </div>
        </div>
      </section>

      <section className="adminChartsLineAndBar">
        <AdminLineChart/>
        <AdminBarChart />
      </section>

      <section className="adminChartsLineAndBar">
        <AdmindPieChart title="Bookings Chart" />
        <AdminRadarChart />
      </section>

      <DashboardHeading heading="Latest Users" buttonText="View All" />
      <section className="adminTableSection">
        <AdminTable />
      </section>
      <DashboardHeading heading="Latest Bookings" buttonText="View All" />

      <section className="adminLatestBookingsSection">
        <AdminLatestBookings />
      </section>
      <DashboardHeading heading="Latest Trasaction" buttonText="View All" />

      <section className="adminLatestTransactionsSection">
        <AdminLatestTransactions />
      </section>
    </>
  );
};

export default Dashboard;
