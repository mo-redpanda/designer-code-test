'use client';

import { DemoBreadcrumbs } from '@/components/custom/demo-breadcrumbs';
import { DemoSidebar } from '@/components/custom/demo-sidebar';
import { Badge } from '@/redpanda-ui/components/badge';
import { Button } from '@/redpanda-ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/redpanda-ui/components/card';
import { SimpleCodeBlock } from '@/redpanda-ui/components/code-block';
import { Input } from '@/redpanda-ui/components/input';
import { Avatar, AvatarFallback } from '@/redpanda-ui/components/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/redpanda-ui/components/select';
import { Separator } from '@/redpanda-ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/redpanda-ui/components/sidebar';
import { Tabs, TabsContent, TabsContentWrapper, TabsList, TabsTrigger } from '@/redpanda-ui/components/tabs';
import { Heading, Text, Dl, Dt, Dd } from '@/redpanda-ui/components/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/redpanda-ui/components/table';

const CLI_SNIPPETS = {
  brew: {
    install: 'brew install redpanda-data/tap/redpanda',
  },
  login: 'rpk cloud login',
  createTopic: 'rpk topic create my-topic',
  produce: "echo \"hello\" | rpk topic produce my-topic",
  consume: 'rpk topic consume my-topic',
};

function TopicsTable() {
  return (
    <Table variant="simple" className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead width="full">Topic</TableHead>
          <TableHead align="right">Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell truncate="truncate">
            <span className="font-mono">__redpanda_connect_logs</span>
          </TableCell>
          <TableCell align="right">
            <Text variant="muted">2.72 MiB</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell truncate="truncate">
            <span className="font-mono">__redpanda_connect_status</span>
          </TableCell>
          <TableCell align="right">
            <Text variant="muted">8.44 MiB</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell truncate="truncate">
            <span className="font-mono">redleader-metric-events</span>
          </TableCell>
          <TableCell align="right">
            <Text variant="muted">348.64 KiB</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell truncate="truncate">
            <span className="font-mono">redleader-slack-input</span>
          </TableCell>
          <TableCell align="right">
            <Text variant="muted">787.89 KiB</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell truncate="truncate">
            <span className="font-mono">redleader-user-mapping</span>
          </TableCell>
          <TableCell align="right">
            <Text variant="muted">7.35 MiB</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export const PageDemo = () => {
  return (
    <SidebarProvider>
      <DemoSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DemoBreadcrumbs />
            <div className="ml-auto flex items-center gap-3">
              <Input placeholder="Ask AI..." className="w-56 md:w-72" />
              <Button variant="secondary" className="hidden md:inline-flex">Ask</Button>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">MC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <Heading level={2}>Overview</Heading>
              <Badge variant="secondary">Running</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <Card size="full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle level={3}>How to connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="cli">
                    <TabsList variant="underline" layout="auto" className="w-full">
                      <TabsTrigger value="cli" variant="underline">CLI</TabsTrigger>
                      <TabsTrigger value="kafka" variant="underline">Kafka API</TabsTrigger>
                      <TabsTrigger value="schema" variant="underline">Schema Registry</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cli">
                      <TabsContentWrapper variant="contained" className="space-y-4">
                        <div className="grid gap-3 md:grid-cols-[240px_1fr] items-start">
                          <Text variant="label" as="div">Choose your install method</Text>
                          <div className="max-w-xs">
                            <Select defaultValue="brew">
                              <SelectTrigger aria-label="Install method">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="brew">macOS • Homebrew</SelectItem>
                                <SelectItem value="linux">Linux • apt/yum</SelectItem>
                                <SelectItem value="docker">Docker</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <SimpleCodeBlock title="Install rpk" code={CLI_SNIPPETS.brew.install} />
                        <SimpleCodeBlock title="Log in" code={CLI_SNIPPETS.login} />
                        <SimpleCodeBlock title="Create a topic and produce a message" code={`${CLI_SNIPPETS.createTopic}\n${CLI_SNIPPETS.produce}`} />
                        <SimpleCodeBlock title="Consume from the topic" code={CLI_SNIPPETS.consume} />
                      </TabsContentWrapper>
                    </TabsContent>
                    <TabsContent value="kafka">
                      <TabsContentWrapper variant="contained">
                        <Text>Use standard Kafka clients. SASL/SSL settings are available in cluster settings.</Text>
                      </TabsContentWrapper>
                    </TabsContent>
                    <TabsContent value="schema">
                      <TabsContentWrapper variant="contained">
                        <Text>Point your client to the Schema Registry endpoint. API keys required.</Text>
                      </TabsContentWrapper>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card size="full">
                <CardHeader>
                  <CardTitle level={4}>Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <TopicsTable />
                  <Button variant="ghost" className="w-full">View all topics</Button>
                </CardContent>
              </Card>

              <Card size="full">
                <CardHeader>
                  <CardTitle level={4}>Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <Dt>Name</Dt>
                    <Dd>agent-cluster</Dd>
                    <Dt>Type</Dt>
                    <Dd>Serverless</Dd>
                    <Dt>State</Dt>
                    <Dd>Running</Dd>
                    <Dt>ID</Dt>
                    <Dd>d0prj7h3k9bn43d49qi0</Dd>
                    <Dt>Cloud provider</Dt>
                    <Dd>AWS</Dd>
                    <Dt>Region</Dt>
                    <Dd>us-east-1</Dd>
                  </Dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
