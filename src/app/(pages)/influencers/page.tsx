import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import InfluencerDrawer from "./InfluencerDrawer";
// import { Separator } from "@/components/ui/separator";
import { InDataTable } from "./InDataTable";
import { Influencer, inColumns } from "./inColumns";
import InfluencerData from "./InfluencerData.json";

export default function Influencers() {
  const data: Influencer[] = InfluencerData;

  return (
    <ContentLayout title="Influencers">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Influencers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* page header */}
      <section className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl mb-3">Influencers List</h1>
          <p className="text-xs text-muted-foreground">
            All Influencers goes here
          </p>
        </div>

        <InfluencerDrawer />
      </section>

      {/* campaign table data */}
      <InDataTable columns={inColumns} data={data} />
    </ContentLayout>
  );
}
