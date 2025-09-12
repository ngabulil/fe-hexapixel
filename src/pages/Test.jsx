import MonthlyReportPDF from "@/components/main/MonthlyReportPDF";
import React from "react";

const Test = () => {
  return (
    <div>
      <MonthlyReportPDF
        title="Monthly Finance Report"
        data={{
          type: "incomes",
          startDate: "2025-07-31T17:00:00.000Z",
          endDate: "2025-08-31T16:59:59.999Z",
          datas: [
            {
              _id: "68b40b93f08b5dee0c540c44",
              price: 100,
              item: {
                _id: "68adea020526d605db6b8f55",
                name: "nani",
                createdAt: "2025-08-26T17:08:18.308Z",
                updatedAt: "2025-08-26T17:08:18.308Z",
                __v: 0,
              },
              quantity: 2,
              totalPrice: 200,
              customerName: "yooo",
              whatsapp: "081212313231",
              createdBy: {
                _id: "68986db582fcbcf216d7f00f",
                username: "super_admin",
                password:
                  "$2b$10$Jk6DWdU4LKKsTdKKxU1RDu.B.NPn0X7lolXd4Y5so3qdJTWPeNhtS",
                fullName: "Super Admin",
                role: "super_admin",
                contactNumber: "082211022160",
                photo:
                  "http://localhost:3000/uploads/users/1754820021099-199975699.png",
                createdAt: "2025-08-10T10:00:21.177Z",
                updatedAt: "2025-08-24T05:20:16.416Z",
                __v: 0,
              },
              createdAt: "2025-08-31T08:45:07.264Z",
              updatedAt: "2025-08-31T08:45:07.264Z",
              __v: 0,
            },
          ],
        }}
      />
    </div>
  );
};

export default Test;
