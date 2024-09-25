"use client";
import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function Calendars() {

    const isClient = typeof window !== "undefined";



    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Calendar | Veltrix - Admin & Dashboard Template</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta content="Premium Multipurpose Admin & Dashboard Template" name="description"/>
                <meta content="Themesbrand" name="author"/>
                <link href="/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css"/>
                <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css"/>
                <link href="/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css"/>
            </Head>


            <main className="p-6">
                {/* 페이지 제목 시작 */}
                <div className="flex items-center md:justify-between flex-wrap gap-2 mt-24">
                    <h4 className="text-default-900 text-lg font-medium mb-2">Starter Page</h4>

                    <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                        <Link href="#" className="text-sm font-medium text-default-700">
                            OpenDash
                        </Link>
                        <i className="material-symbols-rounded text-xl flex-shrink-0 text-default-500">chevron_right</i>
                        <Link href="#" className="text-sm font-medium text-default-700">
                            Menu
                        </Link>
                        <i className="material-symbols-rounded text-xl flex-shrink-0 text-default-500">chevron_right</i>
                        <Link href="#" className="text-sm font-medium text-default-700" aria-current="page">
                            Starter Page
                        </Link>
                    </div>
                </div>
                {/* 페이지 제목 끝 */}

                <div className="col-lg-9">
                    <div className="card">
                        <div className="card-body">
                            <div id="calendar"></div>
                        </div>
                    </div>
                </div>
            </main>

            <script src="/assets/libs/jquery/jquery.min.js"></script>
            <script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="/assets/libs/metismenu/metisMenu.min.js"></script>
            <script src="/assets/libs/simplebar/simplebar.min.js"></script>
            <script src="/assets/libs/node-waves/waves.min.js"></script>


            <script src="/assets/libs/moment/min/moment.min.js"></script>
            <script src="/assets/libs/jquery-ui-dist/jquery-ui.min.js"></script>
            <script src="/assets/libs/fullcalendar/index.global.min.js"></script>

            <script src="/assets/js/pages/calendar.init.js"></script>

            <script src="/assets/js/app.js"></script>

        </>
    )
}