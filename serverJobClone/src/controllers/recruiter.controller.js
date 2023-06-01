import recruiterService from "../service/recruiter.service.js";


export const curruntRecruiter = async (req , res) => {
  const curntRecruiter  = req.user;
  console.log(curntRecruiter.email);
  try{
    if(!curntRecruiter){
      return res.status(400).send({ err: 'User Not Logged In'});
  }

  const userDoc = await recruiterService.findRecruiterByEmail(curntRecruiter.email);
  const user = userDoc?.toJSON();

  delete user?.password;
  res.status(200).json(user);
  }catch(err){
    res.status(400).send({ err: err.message });
  }
}


export const RegisterRecruiter = async (req, res) => {
    try {
      const { companyName, recruiterName, email, password , companyMajor } = req.body;
  
      const existingUser = await recruiterService.findRecruiterByEmail(email);
      
      const companyValid = await recruiterService.findByCompany(companyName);

      if(companyValid){
        return res.status(400).send({
          err: 'Your company has already made registration.'
        });
      }

      if (existingUser) {
        return res.status(400).send({
          err: "User already Exits",
        });
      }
  
      const user = await recruiterService.register(companyName, recruiterName, email, password , companyMajor);
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  };
  

  export const LoginRecruiter = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const LoggedUser =  await recruiterService.loginRecruiter(email , password);
      const companyName = await recruiterService.findRecruiterCompany(email);
      console.log(companyName);
      res.status(200).send(LoggedUser);
  
    } catch (err) {
          res.status(400).send({ err: err.message})
  
    }
  };


  // export const findCompany
  