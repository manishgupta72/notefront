import * as Yup from "yup";

const SignUpSchemas = Yup.object({
  title: Yup.string().min(3).max(24).required("Please Enter min 3 characher"),
  description: Yup.string().min(5).required("Please Enter min 5 character"),
  tag: Yup.string().min(3).required("Please enter min 3 character"),
});


export default SignUpSchemas;
