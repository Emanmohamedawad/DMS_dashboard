
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import DemographicCard from "@/components/ecommerce/DemographicCard";
// import AdvancedTable from "@/components/tables/AdvancedTable";

export default function Ecommerce() {
  return (
    <div className="space-y-6">
      {/* Top: three cards */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 sm:col-span-4">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 sm:col-span-4">
          <MonthlyTarget />
        </div>
        <div className="col-span-12 sm:col-span-4">
          <DemographicCard />
        </div>
      </div>

    </div>
  );
}
