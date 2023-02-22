window.addEventListener("load", () => {
  //this all needs to change as in the #fsdljafsd
  // const invoice_head = document.querySelector("#invoice-head");
  // const name_input = document.querySelector("#name");
  // const email_input = document.querySelector("#email");
  // const pdf_submit = document.getElementById("pdf-submit");
  const task_list = document.querySelector("#task-list");
  const add_task_button = document.getElementById("add-task-button");
  const name = document.getElementById("name");
  const street = document.getElementById("street_address");
  const postal = document.getElementById("postal-code");
  const city = document.getElementById("city");
  const total = document.getElementById("total-input");
  const pdf_submit = document.getElementById("pdf-submit");

  let taskCounter = 0;

  const pdf_object = { jobs: [] };

  add_task_button.addEventListener("click", (e) => {
    e.preventDefault();

    const task = { id: taskCounter, attributes: {} };
    pdf_object.jobs.push(task);
    taskCounter++;

    // const rec_form = document.createElement("form");
    // rec_form.classList.add("recipient-form");

    const tasks_list_div = document.createElement("div");
    tasks_list_div.classList.add("tasks");

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const job_el = document.createElement("div");
    job_el.classList.add("job");

    const job_input = document.createElement("input");
    job_input.classList.add("job_text");
    job_input.type = "text";
    job_input.placeholder = "Job";
    job_input.setAttribute("readonly", "readonly");
    job_el.appendChild(job_input);

    const hours_el = document.createElement("div");
    hours_el.classList.add("hours");
    const hours_input = document.createElement("input");
    hours_input.classList.add("hours_number");
    hours_input.type = "number";
    hours_input.placeholder = "Hours";
    hours_input.min = "0";
    hours_input.step = "0.5";
    hours_input.setAttribute("readonly", "readonly");
    hours_el.appendChild(hours_input);

    const rate_el = document.createElement("div");
    rate_el.classList.add("rate");
    const rate_input = document.createElement("input");
    rate_input.classList.add("rate_number");
    rate_input.type = "number";
    rate_input.placeholder = "Rate";
    rate_input.min = "0";
    rate_input.step = "0.5";
    rate_input.setAttribute("readonly", "readonly");
    rate_el.appendChild(rate_input);

    const date_el = document.createElement("div");
    date_el.classList.add("date");
    const date_input = document.createElement("input");
    date_input.classList.add("date_field");
    date_input.type = "date";
    date_input.setAttribute("readonly", "readonly");
    date_el.appendChild(date_input);

    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");
    const edit_button = document.createElement("button");
    edit_button.classList.add("edit");
    edit_button.innerHTML = "Edit";
    const delete_button = document.createElement("button");
    delete_button.classList.add("delete");
    delete_button.innerHTML = "Delete";
    actions_el.appendChild(edit_button);
    actions_el.appendChild(delete_button);

    const subtotal_el = document.createElement("div");
    subtotal_el.classList.add("sub_total");
    const subtotal_output = document.createElement("input");
    subtotal_output.classList.add("sub_total_output");
    subtotal_output.type = "text";
    subtotal_output.setAttribute("readonly", "readonly");
    subtotal_output.placeholder = "Subtotal";
    subtotal_el.appendChild(subtotal_output);

    task_el.appendChild(job_el);
    task_el.appendChild(hours_el);
    task_el.appendChild(rate_el);
    task_el.appendChild(date_el);
    task_el.appendChild(actions_el);
    task_el.appendChild(subtotal_el);
    console.log(task_el);
    task_list.appendChild(task_el);

    edit_button.addEventListener("click", () => {
      if (edit_button.innerHTML === "Edit") {
        edit_button.innerHTML = "Save";
        job_input.removeAttribute("readonly");
        hours_input.removeAttribute("readonly");
        rate_input.removeAttribute("readonly");
        date_input.removeAttribute("readonly");
      } else if (edit_button.innerHTML === "Save") {
        console.log(pdf_object);
        edit_button.innerHTML = "Edit";
        job_input.setAttribute("readonly", "readonly");
        hours_input.setAttribute("readonly", "readonly");
        rate_input.setAttribute("readonly", "readonly");
        date_input.setAttribute("readonly", "readonly");
        const sub = hours_input.value * rate_input.value;
        subtotal_output.value = `£${formatCurrency(sub)}`;
        // find pdf job that matches id
        const found = pdf_object.jobs.find((job) => {
          return job.id === task.id;
        });
        found.attributes.job = job_input.value;
        found.attributes.hours = hours_input.value;
        found.attributes.rate = rate_input.value;
        found.attributes.date = date_input.value;
        found.attributes.subtotal = sub;
        total.innerHTML = `Total : £${getTotal(pdf_object.jobs)}`;
      }
    });
    delete_button.addEventListener("click", () => {
      const filtered = pdf_object.jobs.filter((job) => {
        return job != task;
      });
      pdf_object.jobs = filtered;
      total.innerHTML = `Total : £${getTotal(pdf_object.jobs)}`;
      task_list.removeChild(task_el);
    });
    // invoice_head.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     taskCounter++;

    //     console.log(pdf_object.jobs);
    //     const name = name_input.value;
    //     const email = email_input.value;
    //     if (name && email) {
    //       pdf_object.name = name;
    //       pdf_object.email = email;
    //     } else {
    //       alert("fill in both forms");
    //       return;
    //     }
    //     //make task div
    //     const task_el = document.createElement("div");
    //     task_el.classList.add("task");
    //     //make job div
    //     const job_el = document.createElement("div");
    //     job_el.classList.add("job");
    //     //make job input field
    //     const job_input = document.createElement("input");
    //     job_input.classList.add("job_text");
    //     job_input.type = "text";
    //     job_input.placeholder = "Job";
    //     job_input.setAttribute("readonly", "readonly");
    //     job_el.appendChild(job_input);
    //     //make hours
    //     const hours_el = document.createElement("div");
    //     hours_el.classList.add("hours");
    //     const hours_input = document.createElement("input");
    //     hours_input.classList.add("hours_number");
    //     hours_input.type = "number";
    //     hours_input.placeholder = "Hours";
    //     hours_input.min = "0";
    //     hours_input.step = "0.5";
    //     hours_input.setAttribute("readonly", "readonly");
    //     hours_el.appendChild(hours_input);
    //     //make rate
    //     const rate_el = document.createElement("div");
    //     rate_el.classList.add("rate");
    //     const rate_input = document.createElement("input");
    //     rate_input.classList.add("rate_number");
    //     rate_input.type = "number";
    //     rate_input.placeholder = "Rate";
    //     rate_input.min = "0";
    //     rate_input.step = "0.5";
    //     rate_input.setAttribute("readonly", "readonly");
    //     rate_el.appendChild(rate_input);
    //     //make date
    //     const date_el = document.createElement("div");
    //     date_el.classList.add("date");
    //     const date_input = document.createElement("input");
    //     date_input.classList.add("date_field");
    //     date_input.type = "date";
    //     date_input.setAttribute("readonly", "readonly");
    //     date_el.appendChild(date_input);
    //     //make actions
    //     const actions_el = document.createElement("div");
    //     actions_el.classList.add("actions");
    //     const edit_button = document.createElement("button");
    //     edit_button.classList.add("edit");
    //     edit_button.innerHTML = "Edit";
    //     const delete_button = document.createElement("button");
    //     delete_button.classList.add("delete");
    //     delete_button.innerHTML = "Delete";
    //     actions_el.appendChild(edit_button);
    //     actions_el.appendChild(delete_button);
    //     //make subtotal
    //     const subtotal_el = document.createElement("div");
    //     subtotal_el.classList.add("sub_total");
    //     const subtotal_output = document.createElement("div");
    //     subtotal_output.classList.add("sub_total_output");
    //     subtotal_output.type = "text";
    //     subtotal_output.innerHTML = "sub-total : ";
    //     subtotal_el.appendChild(subtotal_output);
    //     //append jobs, hours, date, actions/buttons to task
    //     task_el.appendChild(job_el);
    //     task_el.appendChild(hours_el);
    //     task_el.appendChild(rate_el);
    //     task_el.appendChild(date_el);
    //     task_el.appendChild(actions_el);
    //     task_el.appendChild(subtotal_el);
    //     //append induvidual task to list of tasks
    //     task_list.appendChild(task_el);
    //     // edit/delete logic
    //     edit_button.addEventListener("click", () => {
    //       if (edit_button.innerHTML === "Edit") {
    //         edit_button.innerHTML = "Save";
    //         job_input.removeAttribute("readonly");
    //         hours_input.removeAttribute("readonly");
    //         rate_input.removeAttribute("readonly");
    //         date_input.removeAttribute("readonly");
    //       } else if (edit_button.innerHTML === "Save") {
    //         edit_button.innerHTML = "Edit";
    //         job_input.setAttribute("readonly", "readonly");
    //         hours_input.setAttribute("readonly", "readonly");
    //         rate_input.setAttribute("readonly", "readonly");
    //         date_input.setAttribute("readonly", "readonly");
    //         const sub = hours_input.value * rate_input.value;
    //         subtotal_output.innerHTML = `sub-total : £${formatCurrency(sub)}`;
    //         // find pdf job that matches id
    //         const found = pdf_object.jobs.find((job) => {
    //           return job.id === task.id;
    //         });
    //         found.attributes.job = job_input.value;
    //         found.attributes.hours = hours_input.value;
    //         found.attributes.rate = rate_input.value;
    //         found.attributes.date = date_input.value;
    //         found.attributes.subtotal = sub;
    //         total.innerHTML = `Total : £${getTotal(pdf_object.jobs)}`;
    //       }
    //     });
    //     delete_button.addEventListener("click", () => {
    //       const filtered = pdf_object.jobs.filter((job) => {
    //         return job != task;
    //       });
    //       pdf_object.jobs = filtered;
    //       total.innerHTML = `Total : £${getTotal(pdf_object.jobs)}`;
    //       task_list.removeChild(task_el);
    //     });
    // });
  });
  pdf_submit.addEventListener("click", (e) => {
    e.preventDefault();
    create();
  });
});

const getTotal = (arr) => {
  let total = 0;
  for (let obj of arr) {
    total += obj.attributes.subtotal;
  }
  return formatCurrency(total);
};

const formatCurrency = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const removeFromJobs = (task) => {
  const copy = [...pdf_object.jobs];
  const filtered = copy.filter((job) => {
    return job != task;
  });
};

const findTaskIfExists = (task) => {
  const copy = [...pdf_object.jobs];
  const found = copy.find((job) => {
    return job === task;
  });
};
//TODO FIGURE OUT HOW TF JSPDF WORKS AND HOW TO IMPLEMENT IT INTO THE BROWSER
