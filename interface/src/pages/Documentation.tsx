import useCurrentUser from "../api/useCurrentUser";
import SectionDiv from "../components/SectionDiv";

export default function Documentation() {
  const user = useCurrentUser();
  return (
    <div>
      {user && (
        <SectionDiv>
          <h1>Setting up your HPC Account</h1>
          <p>Before you can use the HPC Interface, you must set up your HPC account. To do so, simply copy and paste the following into your computer&apos;s Terminal application:
            <p style={{ maxWidth: "75ch", overflowWrap: "break-word", background: "white" }}>echo {user.publicKey} &gt; tmp.pub; ssh-copy-id -fi tmp.pub {user.username}@uahpc.ua.edu; rm tmp.pub</p>
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
          <a href="https://peterwzhang.github.io/MRI/" target="_blank" rel="noreferrer">
            Project Website
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI/tree/main/interface" target="_blank" rel="noreferrer">
            User Interface GitHub
          </a>
        </p>
        <p>
          <a href="https://github.com/peterwzhang/MRI/tree/main/backend" target="_blank" rel="noreferrer">
            Backend GitHub
          </a>
        </p>
      </SectionDiv>
    </div>
  );
}
