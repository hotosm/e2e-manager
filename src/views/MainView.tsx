import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import NavHeader from './NavHeader';
import { Consent } from '@hotosm/ui/dist/react';
import "./MainView.style.css";

const MainView = () => {
  return (
    <div>
        <NavHeader />
        <div className={"mainViewContent"}>
          <ErrorBoundary>
              <Outlet />
              <div className="trackingBanner">
                <Consent
                  site-id="end-to-end-manager"
                >
                    We use cookies and similar technologies to recognize and analyze your
                    visits, and measure traffic usage and activity. You can learn about how
                    we use the data about your visit or information you provide reading our <a
                      href="https://www.hotosm.org/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      >privacy policy</a
                    >. By clicking "I Agree", you consent to the use of cookies.
                </Consent>
              </div>
          </ErrorBoundary>
        </div>
    </div>
  );
};

export default MainView;

