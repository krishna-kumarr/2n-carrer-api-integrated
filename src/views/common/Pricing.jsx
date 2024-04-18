import React from 'react'
import DashboardNavbar from '../../components/Navbar/DashboardNavbar'
import CardWithText from '../../components/Cards/CardWithText'
import images from '../../utils/images'

const Pricing = () => {

    const professionalPageDashboardMenu = ['Home', 'Learning', 'Community']

    return (
        <div className='pricing-plan'>
            <DashboardNavbar profileImage="https://github.com/mdo.png" profileName="George Martin" dashboadMenus={professionalPageDashboardMenu} />

            <section className='mt-5'>

                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-4 w-75 mx-auto mt-3">
                    <div className="w-100 text-center mt-4">
                        <span className='fs-3 fw-bold'>Pricing plan</span>
                        <span className='ms-4 d-block'><img
                            src={images.underline}
                            alt="underline"
                            className="img-responsive logo"
                        /></span>
                    </div>

                    <div className="col">
                        <CardWithText cardTitle="Basic" cardPrice="$100"
                            cardContent_1="Yes"
                            cardContent_2="No"
                            cardContent_3="No"
                            cardContent_4="No"
                            cardContent_5="No"
                            cardContent_6="No"
                            cardContent_7="No"
                            cardContent_8="No" />
                    </div>

                    <div className="col">
                        <CardWithText cardTitle="Premium" cardPrice="$6,000"
                            cardContent_1="No"
                            cardContent_2="2nd Career team will personally recommend your profile to
                             employers"
                            cardContent_3="Peronalized job recommendation from 2nd Careers team"
                            cardContent_4="10 hours per year - 2nd Career coaches with over 15+ years
                             of experience"
                            cardContent_5="Yes"
                            cardContent_6="Yes"
                            cardContent_7="No"
                            cardContent_8="No" />

                    </div>


                    <div className="col">
                        <CardWithText cardTitle="Elite" cardPrice="$10,000"
                            cardContent_1="No"
                            cardContent_2="2nd Career team will personally recommend your profile to
                             employers"
                            cardContent_3="Peronalized job recommendation from 2nd Careers team"
                            cardContent_4="20 hours per year - 2nd Career coaches with over 20+ years
                             of experience"
                            cardContent_5="Yes"
                            cardContent_6="Yes"
                            cardContent_7="No"
                            cardContent_8="No"
                        />
                    </div>

                    <div className="text-center w-100 fw-medium cardCopyRight mt-5">
                        <span className='d-block mb-1'>Copyright &copy; 2024 | Powered by
                            2nd Careers</span>
                        <span className='d-block mb-3'>Terms and conditions</span>
                    </div>

                </div>
            </section>
        </div>

    )
}

export default Pricing