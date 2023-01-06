import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function MyCKEditor({
  onChange,
  value,
}: {
  onChange: any;
  value: any;
}) {
  console.log(value);
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello</p>"
      // onReady={(editor) => {
      //   console.log("Editor ready", editor);
      // }}
      onChange={(editor: ClassicEditor) => {
        const data = editor.getData();
        onChange(data);
      }}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
}
