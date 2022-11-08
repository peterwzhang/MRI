import useCurrentUser from "../api/useCurrentUser";
import SectionDiv from "../components/SectionDiv";

export default function Documentation() {
  const user = useCurrentUser();
  return (
    <div>
      {user && (
        <SectionDiv>
          <h1>Setting up your HPC Account</h1>
          <p>
            Before you can use the HPC Interface, you must set up your HPC account using the following steps:
            <ol>
              <li>Get access to UA&apos;s HPC Portal</li>
              <ol>
                <li>If you haven&apos;t already, email Dr. Rishi Deshpande hddeshpande@ua.edu with your CWID</li>
                <li>Submit a Research Computing Portal Request to UA&apos;s Office of Information Technology here:
                  <p>
                    <a href="https://research-computing-portal.oitapps.ua.edu/noneMember" target="_blank" rel="noreferrer">
                      UAHPC Request
                    </a>
                  </p>
                </li>
              </ol>
              <li>Set up SSH</li>
              <ol>
                <li>Copy and paste the following into your computer&apos;s Terminal application
                  <p style={{ maxWidth: "75ch", overflowWrap: "break-word", background: "white" }}>echo {user.publicKey} &gt; tmp.pub; ssh-copy-id -fi tmp.pub {user.username}@uahpc.ua.edu; rm tmp.pub</p>
                </li>
              </ol>
            </ol>
          </p>
        </SectionDiv>
      )}
      <SectionDiv>
        <h1>Using the Dashboard</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv>
        <h1>Using Create Batch</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv>
        <h1>Using the Script Library</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
      <SectionDiv>
        <h1>Code Base Documentation</h1>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            Example Link (github)
          </a>
        </p>
      </SectionDiv>
    </div>
  );
}
