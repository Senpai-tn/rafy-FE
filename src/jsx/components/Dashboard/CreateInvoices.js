import React from 'react';
import {Link} from 'react-router-dom';

import DropzoneBlog from './Invoices/DropzoneBlog';

const CreateInvoices = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<h4 className="fs-24 font-w800">SELECT CLIENT</h4>
							<div className="row  border-bottom pb-4 mb-4">
								<div className="col-xl-3">
									<div className="select-client mb-3 mb-xl-0 ">
										<div className="d-flex align-items-center">
											<div>
												<svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect width="61" height="61" rx="20" fill="url(#paint0_linear2)"/>
													<defs>
													<linearGradient id="paint0_linear2" x1="68.1765" y1="5.38235" x2="30.5" y2="61" gradientUnits="userSpaceOnUse">
													<stop offset="1" stopColor="#E023FF"/>
													</linearGradient>
													</defs>
												</svg>
											</div>
											<div className="ms-3">
												<h4 className="fs-20 font-w700">Kleonium Studios</h4>
												<span className="font-w700">Creative Agency</span>
											</div>
											<i className="fas fa-sort-down ms-auto"></i>
										</div>
									</div>
								</div>
								<div className="col-xl-3">
									<div className="d-flex">
										<div className="me-4">
											<i className="fas fa-map-marker-alt text-primary fs-18 mt-1"></i>
										</div>
										<div>
											<span className="mb-2 font-w600">ADDRESS</span>
											<span className="d-block fs-18 font-w600">Franklin Avenue Street <br/>
												New York, ABC 5562<br/>
												United State
											</span>
										</div>	
									</div>
								</div>
								<div className="col-xl-3">
									<div className="d-flex">
										<div className="me-4">
											<i className="fas fa-envelope fs-18 mt-1 text-primary"></i>
										</div>
										<div>
											<span className="mb-2 font-w600">Email</span>
											<span className="d-block fs-18 font-w600">kleoinumstudios@mail.com</span>
										</div>	
									</div>
								</div>
								<div className="col-xl-3">
									<div className="d-flex">
										<div className="me-4">
											<i className="fas fa-phone-alt fs-18 mt-1 text-primary"></i>
										</div>
										<div>
											<span className="mb-2 font-w600">TELEPHONE</span>
											<span className="d-block fs-18 font-w600">(012) 3456 789</span>
										</div>	
									</div>
								</div>
							</div>
							<h4 className="fs-24 font-w800">GENERAL</h4>
							<div className="row mb-4">
								<div className="col-xl-4">
									<div className="form-group mb-3 invoice">
										<label>INVOICE NO</label>
										 <input type="text" className="form-control"  placeholder="#INV-123124124" />
									</div>
								</div>
								<div className="col-xl-4">
									<div className="form-group mb-3 invoice">
										<label>AMOUNT (USD)</label>
										 <input type="text" className="form-control"  placeholder="5,000" />
									</div>
								</div>
								<div className="col-xl-4">
									<div className="form-group mb-3 invoice">
										<label>DUE DATE</label>
										<input size="16" type="date" className="form-control" />
									</div>
								</div>
							</div>
							<h4 className="fs-24 font-w800">Item Desription</h4>
							<div className="my-5">
								<div className="d-flex justify-content-between item-desription mb-3">
									<span>ITEM DESCRIPTION</span>
									<span>DURATION</span>
									<span className="me-4">RATE</span>
									<span>AMOUNT</span>
								</div>
								<div className="d-flex justify-content-between item-desription1 border-bottom pb-3">
									<span>Desgin System</span>
									<span className="ms-1">12th</span>
									<span>75.00</span>
									<span>$ 900.00</span>
								</div>
								<div className="d-flex justify-content-between item-desription1 border-bottom pb-3 mt-3">
									<span>Wireframing</span>
									<span className="ms-4">64th</span>
									<span>60.00</span>
									<span>$ 360.00</span>
								</div>
							</div>
							<h4 className="fs-18 font-w600 mb-5">Type description here...</h4>
							<h4 className="fs-24 font-w800">Attach File</h4>
							<div className="row mt-4 ">
								<div className="col-xl-6">
									<div className="dropzone dropzone-multi dz-dropzone-box d-flex" id="kt_dropzone_5">
										<DropzoneBlog />
									</div>
								</div>
								<div className="col-xl-6">
									<div className="text-end mt-4">
										<Link to={"#"} className="btn btn-primary btn-lg me-1 me-sm-3">SEND INVOICE</Link>
										<Link to={"#"} className="btn btn-primary light btn-lg">SAVE TO LATER</Link>
									</div>
								</div>
							</div>
						
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CreateInvoices; 