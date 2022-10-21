import SectionDiv from "../components/SectionDiv";

export default function Home() {
  return (
    <div>
      <SectionDiv>
        <h1>Welcome to the HPC Interface!</h1>
        <p style={{ fontSize: "1.25rem", lineHeight: 1.5, textIndent: "1rem" }}>
          Welcome to the interface for the image processing pipeline that runs on the University of
          Alabama&apos;s HPC. With this website, you can select which projects, participants, and
          processes you want to submit to the cluster. After submitting this information, the
          software will use it to create the necessary input files and submit a new job to the
          scheduler. Upon the completion of jobs, you can access the resulting files under the
          &ldquo;View Jobs&rdquo; tab.
        </p>
      </SectionDiv>
    </div>
  );
}
