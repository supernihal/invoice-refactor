# Invoice Factor
## Challenged by Finvoice
A lender wants to control the lifecycle of invoices for different borrowers.

**Invoice States**
![image](https://user-images.githubusercontent.com/18500/234919346-18d17f2c-c85a-4256-8c00-83d6433847e7.png)

- created: When an invoice is created.
- rejected: When a submitted invoice is rejected for some reason.
- approved: When an invoice is approved and it is available to be purchased.
- purchased: When an invoice is purchased by the lender.
- closed: When an invoice is closed, it is in the last state of its life cycle.


**Invoices:**
- Invoice # - alphanumeric (cannot be repeated in the system)
- Invoice amount
- Invoice due date
- Status

**Borrowers:**
- Name

**Invoices Page Example:**
<img width="1096" alt="image" src="https://user-images.githubusercontent.com/18500/235511315-17913576-c90f-4efb-82e7-e8df0d2c53dd.png">

**Acceptance Criteria**
- A way to handle invoice statuses
	- Only approved invoices can be purchased
	- Only purchased invoices can be closed
		
**What will be evaluated:**
* Code organization
* Tests - Frontend/integration tests are preferable
* Documentation → need to be able to run locally without asking
* Version control organization (meaningful commits)

This challenge should take around 2hs.

**Submission**

We have already created a base repository to help you: https://github.com/Finvoice/xen_base_challenge.

Send us your github user to receive access.
Fork the repository and send a Pull Request when finished.

Please inform lisa at lisa@finvoice.co that your challenge is ready to be review.
 
# How it works


https://github.com/supernihal/invoice-refactor/assets/11772237/139d264f-f52c-4678-a139-36401867c76f

