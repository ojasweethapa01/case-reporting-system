import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCase } from "../../hooks/useCase";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import "./AddCase.css";

const schema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
    // reported date can't be in future
    reportedDate: yup
      .string()
      .required("Reported date is required!")
      // reported date can't be in future but can be today's date
      .test("is-future", "Reported date can not be in future!", (value) => {
        const today = new Date();
        const reportedDate = new Date(value as string);
        return reportedDate <= today;
      }),
  })
  .required();

type Inputs = {
  title: string;
  description: string;
  reportedDate: string;
};

interface AddCaseProps {}

const AddCase: React.FC<AddCaseProps> = () => {
  const { addCase, editCase, cases } = useCase();
  const navigate = useNavigate();

  const query = useQuery();

  const existingCase = cases.find(
    (caseItem) => caseItem.id === query.get("id")
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: existingCase?.title || "",
      description: existingCase?.description || "",
      reportedDate: existingCase?.reportedDate || "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (existingCase) {
      editCase(existingCase.id, data);
    } else {
      addCase({
        title: data.title,
        id: cases.length.toString(),
        description: data.description,
        reportedDate: data.reportedDate,
      });
    }
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input
            className="input-text"
            placeholder="Case Title"
            {...register("title")}
          />
          <p className="error-text">{errors.title?.message}</p>
        </div>

        <div className="input-group">
          <textarea
            className="input-description"
            placeholder="Case description"
            {...register("description")}
          />
          <p className="error-text">{errors.description?.message}</p>
        </div>

        <div className="input-group">
          <input
            type="date"
            className="input-date"
            {...register("reportedDate")}
          />
          <p className="error-text">{errors.reportedDate?.message}</p>
        </div>

        <br />
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default AddCase;
