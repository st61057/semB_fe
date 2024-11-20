function DashboardPage() {

    return (
        <iframe
            src="http://localhost:5601/app/dashboards#/create?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=(panels:!((embeddableConfig:(),gridData:(h:15,i:ebe8a8b0-8434-411d-84c0-24db338276cb,w:24,x:0,y:0),id:'09039430-a74b-11ef-a43f-4747f2b5ec86',panelIndex:ebe8a8b0-8434-411d-84c0-24db338276cb,type:lens,version:'8.10.2'),(embeddableConfig:(),gridData:(h:15,i:bc6b75d6-8994-496f-a48c-789816e74e74,w:24,x:24,y:0),id:'65b38940-a74d-11ef-a43f-4747f2b5ec86',panelIndex:bc6b75d6-8994-496f-a48c-789816e74e74,type:lens,version:'8.10.2'),(embeddableConfig:(),gridData:(h:15,i:'47052579-d318-48da-a807-6f86db9ab4b5',w:24,x:0,y:15),id:c158e8f0-a74b-11ef-a43f-4747f2b5ec86,panelIndex:'47052579-d318-48da-a807-6f86db9ab4b5',type:lens,version:'8.10.2'),(embeddableConfig:(),gridData:(h:15,i:'34051989-cc54-4131-9b2f-b2f1d5e608f1',w:24,x:24,y:15),id:e9df0e30-a74b-11ef-a43f-4747f2b5ec86,panelIndex:'34051989-cc54-4131-9b2f-b2f1d5e608f1',type:lens,version:'8.10.2')))&show-top-menu=true&show-query-input=true&show-time-filter=true"
            height="1000" width="1500">
        </iframe>
    )

}

export default DashboardPage;