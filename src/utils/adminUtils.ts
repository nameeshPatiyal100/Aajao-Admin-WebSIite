// utils/dateUtils.ts
export const getLast12Days = (): string[] => {
    const days: string[] = [];
  
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
  
      days.push(
        date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      );
    }
  
    return days;
  };

  export const userRows = [
    {
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Priya Verma",
      email: "priya.verma@gmail.com",
      role: "Host",
      status: "Inactive",
    },
    {
      name: "Rahul Singh",
      email: "rahul.singh@gmail.com",
      role: "User",
      status: "Active",
    },
    {
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Priya Verma",
      email: "priya.verma@gmail.com",
      role: "Host",
      status: "Inactive",
    },
    {
      name: "Rahul Singh",
      email: "rahul.singh@gmail.com",
      role: "User",
      status: "Active",
    },
  ];