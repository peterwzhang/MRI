import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/themes/prism.css";
import { FieldRenderProps } from "react-final-form";
import Editor from "react-simple-code-editor";
import css from "./CodeEditor.module.scss";

export default function CodeEditor({
  input,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  meta,
  textareaId,
  label,
  ...rest
}: FieldRenderProps<string> & { textareaId: string; label: string }) {
  return (
    <fieldset className={css.border}>
      <legend>
        <label htmlFor={textareaId}>{label}</label>
      </legend>
      <Editor
        {...input}
        // we want value, not event
        onChange={undefined}
        onValueChange={input.onChange}
        highlight={(code) => Prism.highlight(code, Prism.languages.bash, "bash")}
        className={css.editor}
        textareaId={textareaId}
        {...rest}
      />
    </fieldset>
  );
}
