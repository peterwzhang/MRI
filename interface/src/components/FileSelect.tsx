import React, { ChangeEvent, useState } from "react";

function FileSelect() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) setFile(e.target.files[0]);
  };

  return (
    <div>
      <form>
        <input
          type="file"
          onChange={(e) => handleChange}
          accept=".json"
        />
        <p />
      </form>
    </div>
  );
}


export default FileSelect;
