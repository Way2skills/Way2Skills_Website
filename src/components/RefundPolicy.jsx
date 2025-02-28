import React from "react";
import Navbar from "./Navbar";

const RefundPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
    <div className="p-6 max-w-4xl mx-3 mt-20 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Refund and Cancellation policy</h1>

      <p className="my-4 text-gray-300 text-justify">
      This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service 
that you have purchased through the Platform. Under this policy:
      </p>
      <ul className="list-decimal ml-7">
      <li className="mb-4 text-gray-300 text-justify">
      Cancellations will only be considered if the request is made <b>7 days</b> of placing the order. However, 
cancellation requests may not be entertained if the orders have been communicated to such sellers / 
merchant(s) listed on the Platform and they have initiated the process of shipping them, or the 
product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
      </li>
      <li className="mb-4 text-gray-300 text-justify">
      <b>WAY2SKILLS</b> does not accept cancellation requests for perishable items like flowers, eatables, 
etc. However, the refund / replacement can be made if the user establishes that the quality of the 
product delivered is not good.
</li>
<li className="mb-4 text-gray-300 text-justify">
In case of receipt of damaged or defective items, please report to our customer service team. The 
request would be entertained once the seller/ merchant listed on the Platform, has checked and 
determined the same at its own end. This should be reported within <b>7 days</b> of receipt of products. 
In case you feel that the product received is not as shown on the site or as per your expectations, 
you must bring it to the notice of our customer service within <b>7 days</b> of receiving the product. The 
customer service team after looking into your complaint will take an appropriate decision.
</li>
<li className="mb-4 text-gray-300 text-justify">
In case of complaints regarding the products that come with a warranty from the manufacturers, 
please refer the issue to them.
</li>
<li className="mb-4 text-gray-300 text-justify">
In case of any refunds approved by <b>WAY2SKILLS</b>, it will take <b>3 days</b> to credit to your bank account.
</li>
      </ul>
    </div>
    </div>
    </>
  );
};

export default RefundPolicy;
